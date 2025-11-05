import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv'

dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env.development"
});

export const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "stickwithit",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});