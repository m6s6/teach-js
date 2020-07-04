import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routers from './routers';


const port = 5000;
const app = express();

app.use(cors({
    origin: '*',
    methods: '*'
}));
app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true
}));
app.use(bodyParser.json({
    limit: '500mb'
}));

app.use('/', routers);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})