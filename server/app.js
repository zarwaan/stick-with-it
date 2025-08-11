import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({
    path: `.env.${NODE_ENV}`
});

const port = process.env.PORT;
let id = 1;

app.get('/',(req,res)=>{
    res.send('Server running!')
});

app.post('/login',(req,res)=>{
    const {username, password} = req.body;
    // send to db
    console.log(`Username: ${username} \nPassword: ${password}`);
    if(password!=="securepassword"){
        return res.status(401).json({
            success: false,
            message: "Incorrect username or password"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Logged in successfully!"
    })
})

app.post('/register',(req,res)=>{
    const {username, password, firstName, lastName} = req.body;
    //send to db
    console.log(`Username: ${username} \nFirst name: ${firstName} \nLast name: ${lastName} \nPassword: ${password}`);
    return res.status(200).json({
        success: true,
        message: "Registered successful",
        userId: id++,
    })
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));