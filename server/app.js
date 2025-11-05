import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import session from 'express-session';
import { AuthError } from './CRUD/habitOperations.js';
import habitRouter from './routes/habitRouter.js';
import usersRouter from './routes/usersRouter.js';
import logsRouter from './routes/logsRouter.js';
import authRouter from './routes/authRouter.js';

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

app.use('/users', usersRouter);

app.use('/habits', habitRouter)

app.use('/logs',logsRouter);

app.use('/auth',authRouter)

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));