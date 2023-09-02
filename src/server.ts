import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended:false }));
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta: ${process.env.PORT}`)
})

