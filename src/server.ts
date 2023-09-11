import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import routes from './routes';
import { pgHelper } from './database';

const app = express();

app.use(cors(({
    origin: 'https://projeto-recados-redux.vercel.app',
  })));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(routes);

pgHelper.connect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Servidor rodando na porta: ${process.env.PORT}`)
    })
}).catch((err)=> console.log(err))

