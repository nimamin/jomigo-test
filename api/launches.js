import fetch from 'node-fetch';
export async function getLaunches(page, limit, year) {
    const body = {
        options: {
            page,
            limit,
        }
    };
    if (year) {
        body.query = {
            date_utc: {
                $gte: `${year}-01-01T00:00:00.000Z`,
                $lte: `${year + 1}-01-01T00:00:00.000Z`
            }
        }
    }
    const response = await fetch("https://api.spacexdata.com/v5/launches/query", {
        method: "post",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json();
    return data;
}
