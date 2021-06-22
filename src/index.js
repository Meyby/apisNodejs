const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express(); // Aplicación de express
const apiV1 = require('./routes/v1/index');

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

apiV1(app);

app.use((rq, rs) => {
  rs.status(404).send('NOT FOUND');
});

app.listen(port, () => {
  console.log(`runing on ${port}`);
});
