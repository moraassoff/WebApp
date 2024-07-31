import express from 'express'; 
import bodyParser from 'body-parser';
import estudiantesRouter from './routes/estudiantesRouter.js'; 
import { config } from 'dotenv';

config();

 //const express = require('express');
// const estudiantesRouter = require('./routes/estudiantesRouter.js');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('Alive!');
});

app.use('/estudiantes', estudiantesRouter);

app.listen(PORT, () => {
    console.log('Api listening on port ', PORT);
});

export default app;