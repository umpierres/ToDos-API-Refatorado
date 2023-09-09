import { config } from "./ormconfig";
import {DataSource} from 'typeorm'

export const dataSource = new DataSource(config)