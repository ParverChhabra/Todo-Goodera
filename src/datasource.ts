import { config } from "dotenv";
import { Todo } from './todo.entity';
import { DataSource, DataSourceOptions } from "typeorm";
config();

const options: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',      // or your DB host
    port: 5432,             // default PostgreSQL port
    username: 'postgres',
    password: '1234',
    database: 'todo',
    entities: [Todo],
    synchronize: false,      // set to false in production
    migrations: ["dist/migrations/*.js"],

};

const datasource = new DataSource(options);
export default datasource;