import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Flight Number',
    selector: row => row.flight_number,
    width: '100px'
  },
  {
    name: 'Name',
    selector: row => row.name,
    width: '200px'
  },
  {
    name: 'Image',
    cell: row => <img src={row.links.patch.small} width={50} alt={row.name}></img>,
    selector: row => row.links.patch.small,
    width: '100px'
  },
  {
    name: 'Detail',
    selector: row => row.details,
    width: '500px'
  },
  {
    name: 'Date',
    selector: row => row.date_utc,
    width: '300px'
  },
];


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [selectedYear, setSelectedYear] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(page, perPage, selectedYear);
  }, [page, perPage, selectedYear])

  const fetchData = async (page, limit, year) => {
    fetch(`http://localhost:3080/launches/${year ?? ""}`, {
      method: "post",
      body: JSON.stringify({
        page,
        limit,
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.docs);
          setTotalRows(result.totalDocs);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  const handlePageChange = page => {
    setPage(page);
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    setPage(page);
  }

  const handleYearChange = e => {
    setSelectedYear(Number(e.target.value));
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <label>
          Year: 
          <input type="number" value={selectedYear} onChange={handleYearChange} min="2006" max="2022" />
        </label>
        <DataTable
          columns={columns}
          data={items}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      </div>
    );
  }
}

export default App;
