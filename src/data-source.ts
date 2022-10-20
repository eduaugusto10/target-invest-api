import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm"

const port = process.env.DB_PORT_DEV as number | undefined

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST_DEV,
    port: port,
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASS_DEV,
    database: process.env.DB_NAME_DEV,
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/**/entity/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})