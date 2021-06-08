// Modulo de nucleo
// const http = require('http');
// const url = require('url');
// Importación global -> const operations = require('./utils/operations');
// Importación parcial -> const { multiplicacion, suma } = require('./utils/operations');

const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express(); // Aplicación de express
const apiV1 = require('./routes/v1/index');

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.get('/info', (rq, rs) => {
    rs.header('Content-type', 'application/json');
    rs.status(200).send(JSON.stringify({version: '0.0.1', appName: 'curso nodeJs'}));
});

apiV1(app);

app.use((rq, rs) => {
    rs.status(404).send('NOT FOUND');
});

app.listen(port, () => {
    console.log(`runing on ${port}`);
});
