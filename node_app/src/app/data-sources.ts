import { DataSource } from "typeorm";
import { UserDb } from "./entities/UserDb";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "rinha",
    synchronize: true,
    logging: false,
    entities: [UserDb],
    subscribers: [],
    migrations: [],
})