import express, { Application, Request, Response } from 'express';
import { urlencoded, json } from 'body-parser';
import apiV1 from './routes/v1';

const port = 3000;
const app: Application = express(); // Aplicación de express;


app.use(urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(json()); // parse application/json

apiV1(app);

app.use((rq: Request, rs: Response): void => {
  rs.status(404).send('NOT FOUND');
});

app.listen(port, () => {
});
