import * as mysql from 'mysql2';
import * as dotenv from 'dotenv'
import { createUsersTable } from './dbSchema.js';

dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env.development"
});

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

conn.connect(err => {
    if(err) throw err
    conn.query(createUsersTable,(err,res)=>{
        if(err) throw err
        console.log('Created table users')
        conn.end();
    })
})
