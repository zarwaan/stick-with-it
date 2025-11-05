import * as mysql from 'mysql2';
import * as dotenv from 'dotenv'
import { createHabitsLogTable, createHabitsTable, createUsersTable } from './dbSchema.js';

dotenv.config({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env.development"
});

const conn = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "stickwithit"
});

conn.connect(err => {
    if(err) throw err
    conn.query(createUsersTable,(err,res)=>{
        if(err) throw err
        console.log('Created table users')
    })

    conn.query(createHabitsTable,(err,res)=>{
        if(err) throw err
        console.log('Created table habits')
    });

    conn.query(createHabitsLogTable,(err,req)=>{
        if(err) throw err
        console.log('Created habits logs table')
        conn.end()
    });
})