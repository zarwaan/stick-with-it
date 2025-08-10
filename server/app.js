import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Server running!')
});

app.get('/login',(req,res)=>{
    const 
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));