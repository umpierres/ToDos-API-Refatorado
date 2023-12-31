import 'dotenv/config';
import { DataSourceOptions } from "typeorm";


export const config: DataSourceOptions = {
    type: 'postgres',
    url: process.env.URL_DATABASE,
    synchronize: false,
    logging: false,
    entities: ['dist/database/entities/**/*'],
    migrations: ['dist/database/migrations/**/*'],
    ssl: {
        rejectUnauthorized: false,
    }
}