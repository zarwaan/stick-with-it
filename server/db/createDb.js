import * as mysql from 'mysql2';
import * as dotenv from 'dotenv'

dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env.development"
});

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const databaseCreationQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;

conn.connect(err => {
    if(err) throw err
    conn.query(databaseCreationQuery,(err, res) => {
        if(err) throw err;
        console.log(`Created database ${process.env.DB_NAME}`)
        conn.end();
    })
});
