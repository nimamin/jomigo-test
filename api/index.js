import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getLaunches } from "./launches.js"

const app = express()
const port = 3080

app.use(bodyParser.json());
app.use(cors());

app.post('/launches/:year', async (req, res) => {
    const page = req.body.page;
    const limit = req.body.limit;
    const year = req.params.year;
    const data = await getLaunches(page, limit, year);
    res.json(data);
})

app.post('/launches', async (req, res) => {
    const page = req.body.page;
    const limit = req.body.limit;
    const data = await getLaunches(page, limit);
    res.json(data);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

