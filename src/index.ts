import express, { Application, Request, Response } from 'express';
import { urlencoded, json } from 'body-parser';
import apiV1 from './routes/v1';
import conecction from './db/conecction';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

// Se puede leer las variables del archivo .env
dotenv.config();

const port: string = process.env.PORT!;
const app: Application = express(); // Aplicación de express;

app.use(cors({
  origin: ['http://...', 'http://localhost:5000/'] // Se puede hacer una lista de direcciones que estan permitidas
}));

app.use(urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(json()); // parse application/json

app.get('/', (rq, rs) => rs.sendFile(path.join(`${__dirname}/view/index.html`)))
apiV1(app);

app.use((rq: Request, rs: Response): void => {
  rs.status(404).send('NOT FOUND');
});

conecction().then((connected: boolean) => {
  if (connected) {
    app.listen(port, () => {
      console.log('Running on ', port);
    }); 
  } else {
    console.error('Error mongo db');
     
  }
})
