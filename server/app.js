import express, { response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import session from 'express-session';
import { deleteUser, getUserDetails, login, register, updateUserDetails } from './CRUD/userOperations.js';
import bcrypt from 'bcrypt';
import { AuthError, createNewHabit, deleteHabit, fetchHabit, fetchUserHabits, updateHabit } from './CRUD/habitOperations.js';
import { checkIfLogged, getHabitLogs, getHabitsLoggedOnDay, logHabit } from './CRUD/habitlogOperations.js';
import { getStats } from './CRUD/statistics.js';
import habitRouter from './routes/habitRouter.js';
import usersRouter from './routes/usersRouter.js';

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

///// Users /////

app.use('/users', usersRouter);

// app.post('/login',async (req,res)=>{
//     try{
//         const {username, password} = req.body;
//         const response = await login(username,password);
//         if(response.success){
//             req.session.user = response.result;
//             console.log('\nLogged in!')
//             console.log(req.session.user);
//             return res.status(200).json(response);
//         }
//         else{
//             return res.status(401).json(response);
//         }
//     }
//     catch(err){
//         return res.status(500).json(err)
//     }
// })

// app.post('/register',async (req,res)=>{
//     try{
//         const {username, password, firstName, lastName} = req.body;
//         const hashedPassword = await bcrypt.hash(password,10);
//         const response = await register(username,firstName,lastName,hashedPassword);
//         req.session.user = {
//             userId: response.result.insertId,
//             username: username
//         };
//         console.log('\nRegistered!')
//         console.log(req.session.user)
//         return res.status(200).json(response);
//     }
//     catch(err){
//         return res.status(400).json(err);
//     }
// });

// app.post('/logout',(req,res) => {
//     req.session.destroy(err => {
//         if(err) return res.status(500).json({
//             success: false,
//             message: 'Could not log out'
//         });
//         res.clearCookie('connect.sid');
//         console.log('\nLogged out!')
//         console.log(req.session);
//         return res.status(200).json({
//             success: true,
//             message: "Logged out!"
//         })
//     })
// })

// app.post('/user-details',async (req,res)=>{
//     try{
//         //normally
//         const {userId, username} = req.session.user;
        
//         // for testing with postman
//         // const {userId, username} = req.body;
        
//         const response = await getUserDetails(userId,username);
//         if(response.success){
//             return res.status(200).json(response)
//         }
//         else{
//             return res.status(404).json(response)
//         }
//     }
//     catch(err){
//         return res.status(500).json(err)
//     }
// })

// app.post('/session-details',(req,res) => {
//     console.log('\nSession details')
//     console.log(req.session.user);
//     try{
//         if(req.session.user){
//             return res.status(200).json({loggedIn: true, username: req.session.user.username})
//         }
//         else{
//             return res.status(200).json({loggedIn: false, username: null})
//         }
//     }
//     catch(err){
//         return res.status(500).json({message: "Server error"})
//     }
// })

// app.post('/delete-user', async (req,res) => {
//     try{
//         const {userId, username} = req.session.user;
//         const response = await deleteUser(userId,username)
//         if(response.success){
//             console.log('\nDeleted user!')
//             console.log(req.session.user);
//             req.session.destroy(err => {
//                 if(err) return res.status(500).json({
//                     success: false,
//                     message: 'Could not log out'
//                 });
//                 res.clearCookie('connect.sid');
//                 console.log('\nLogged out!')
//                 console.log(req.session);
//                 return res.status(200).json(response)
//             })
//         }
//         else{
//             return res.status(404).json(response)
//         }
//     }
//     catch(err){
//         return res.status(500).json(err)
//     }
// })

// app.post('/update-details',async (req,res) => {
//     try{
//         const {userId} = req.session.user
//         const {username, firstName, lastName} = req.body;
//         // continue from here
//         const response = await updateUserDetails(userId, username, firstName, lastName);
//         if(response.success){
//             req.session.user = {userId:userId, username:username}
//             console.log('\nUpdated user details!');
//             console.log(req.session.user)
//             return res.status(200).json(response)
//         }
//         else{
//             console.log("\details update trial")
//             console.log(response);
//             return res.status(400).json(response)
//         }
//     }
//     catch(err){
//         console.log("\ndetails update error")
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })

/**/

/////// habits ///////

app.use('/habits', habitRouter)

// app.post('/new-habit',async (req,res) => {
//     try{
//         // normal:
//         const {userId} = req.session.user;
        
//         // postman
//         // const {userId} = req.body;

//         const {title, emoji, dayArray} = req.body;

//         const response = await createNewHabit(userId,title,emoji,dayArray)
//         if(response.success){
//             console.log("\nInserted new habit for user "+userId)
//             console.log(response)
//             return res.status(200).json(response)
//         }
//         else{
//             return res.status(500).json(response)
//         }
//     }
//     catch(err){
//         console.log("\nError inserting!")
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })

////

// app.post('/fetch-habits',async (req,res) => {
//     try{
//         // normal:
//         const {userId} = req.session.user;
        
//         // postman
//         // const {userId} = req.body;
//         const requireTodayLog = (req.query.requireTodayLog && req.query.requireTodayLog>0) || false
//         const day = req.body.day || null;

//         const response = await fetchUserHabits(userId,day,requireTodayLog)
//         if(response.success){
//             console.log("\nFound")
//             // console.log(response)
//             return res.status(200).json(response)
//         }
//     }
//     catch(err){
//         console.log("\nError finding!")
//         console.log(err)
//         return res.status(500).json(err)
//     }
// }) 

///

// app.post('/get-habit',async (req,res) => {
//     try{
//         const {habitId} = req.body;

//         const response = await fetchHabit(habitId)
//         if(response.success){
//             console.log("\nFound")
//             console.log(response)
//             return res.status(200).json(response)
//         }
//         else{
//             console.log("\nNot found")
//             return res.status(404).json(response)
//         }
//     }
//     catch(err){
//         console.log("\nError finding!")
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })



////

// app.post('/delete-habit',async (req,res) => {
//     try{
//         const {userId} = req.session.user || -1;
//         const {habitId} = req.body;

//         const response = await deleteHabit(userId, habitId)
//         if(response.success){
//             console.log("\nDeleted")
//             console.log(response)
//             return res.status(200).json(response)
//         }
//         else{
//             console.log("\nError deleting")
//             return res.status(500).json(response)
//         }
//     }
//     catch(err){
//         if(err.code === 401) return res.status(401).json(err)
//         console.log("\nError deleting!")
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })

// app.post('/update-habit', async (req,res) => {
//     try{
//         const {userId} = req.session.user || -1;
//         const {habitId, title, emoji, dayArray} = req.body;
//         const response = await updateHabit(userId,habitId,title,emoji,dayArray);

//         if(response.success){
//             console.log("\nUpdated")
//             console.log(response)
//             return res.status(200).json(response)
//         }
//         else{
//             console.log("\Not found")
//             console.log(response)
//             return res.status(404).json(response)
//         }
//     }
//     catch(err){
//         if(err.code === 401) return res.status(401).json(err)
//         console.log('\nError Updating')
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })

export function returnError(err,res){
    console.log(err);
    if(err instanceof AuthError)
        return res.status(401).json(err)
    return res.status(500).json(err)
}

app.post('/log-habit',async (req,res) => {
    try{
        const {userId} = req.session.user || -1;
        const {habitId} = req.body;

        const response = await logHabit(habitId, userId);
        if(response.success){
            return res.status(200).json(response)
        }
        else{
            return res.status(409).json(response)
        }
    }
    catch(err){
        console.log(err)
        returnError(err,res)
    }
})

app.post('/check-logs', async (req, res) => {
    try{
        const {habitId} = req.body;
        const response = await checkIfLogged(habitId)
        if(response.success){
            return res.status(200).json({logged: response.result.logged})
        }
        else{ //how
            return res.status(500).json(response)
        }
    }
    catch(err){
        console.log(err)
        returnError(err,res)
    }
})

app.post('/get-logs',async (req,res) => {
    try{
        const {habitId} = req.body;

        const response = await getHabitLogs(habitId);
        if(response.success){
            return res.status(200).json(response)
        }
        else{
            return res.status(409).json(response)
        }
    }
    catch(err){
        console.log(err)
        returnError(err,res)
    }
})

class Response {
    constructor(success,message,result){
        this.success = success
        this.message = message
        this.result = result
    }
}

// app.get('/habit/:id/stats',async (req,res) => {
//     try{
//         const habitId = req.params.id;
//         const fields = req.query.fields?.split(',') || null;
//         const year = req.query.year || "all time";
//         const month = req.query.month || "all";

//         const response = await getStats(habitId, fields, year, month)
//         if(response.success){
//             return res.status(200).json(response)
//         }
//         else{
//             return res.status(404).json(response)
//         }
//     }
//     catch(err){
//         returnError(err,res)
//     }
// })

app.get('/user/logs',async (req, res) => {
    try {
        const {userId} = req.session.user
        // const userId = 8 //only for testing
        const date = req.query.date || null;
        const month = req.query.month || null;
        const year = req.query.year || null;
        
        const response = await getHabitsLoggedOnDay(date, month, year, userId)
        return res.status(200).json(response)
    }
    catch(err){
        returnError(err,res)
    }
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));