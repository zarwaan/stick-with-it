import express, { response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import session from 'express-session';
import { login, register } from './CRUD/userOperations.js';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({
    path: `.env.${NODE_ENV}`
});

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}));

const port = process.env.PORT || 3000;
let id = 1;

app.get('/',(req,res)=>{
    res.send('Server running!')
});

app.post('/login',async (req,res)=>{
    try{
        const {username, password} = req.body;
        const response = await login(username,password);
        if(response.success){
            req.session.user = response.result;
            console.log(response.result);
            return res.status(200).json(response);
        }
        else{
            return res.status(401).json(response);
        }
    }
    catch(err){
        return res.status(500).json(err)
    }
})

app.post('/register',async (req,res)=>{
    try{
        const {username, password, firstName, lastName} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const response = await register(username,firstName,lastName,hashedPassword);
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(500).json(err);
    }
});

app.post('/logout',(req,res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).json({
            success: false,
            message: 'Could not log out'
        });
        res.clearCookie('connect.sid');
        console.log(req.session);
        return res.status(200).json({
            success: true,
            message: "Logged out!"
        })
    })
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));