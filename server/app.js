import express, { response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import session from 'express-session';
import { getUserDetails, login, register } from './CRUD/userOperations.js';
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
        sameSite: 'lax',
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
            console.log('\nLogged in!')
            console.log(req.session.user);
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
        req.session.user = {
            userId: response.result.insertId,
            username: username
        };
        console.log('\nRegistered!')
        console.log(req.session.user)
        return res.status(200).json(response);
    }
    catch(err){
        return res.status(400).json(err);
    }
});

app.post('/logout',(req,res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).json({
            success: false,
            message: 'Could not log out'
        });
        res.clearCookie('connect.sid');
        console.log('\nLogged out!')
        console.log(req.session);
        return res.status(200).json({
            success: true,
            message: "Logged out!"
        })
    })
})

app.post('/user-details',async (req,res)=>{
    try{
        //normally
        const {userId, username} = req.session.user;
        
        // for testing with postman
        // const {userId, username} = req.body;
        
        const response = await getUserDetails(userId,username);
        if(response.success){
            return res.status(200).json(response)
        }
        else{
            return res.status(404).json(response)
        }
    }
    catch(err){
        return res.status(500).json(err)
    }
})

app.post('/session-details',(req,res) => {
    console.log('\nSession details')
    console.log(req.session.user);
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));