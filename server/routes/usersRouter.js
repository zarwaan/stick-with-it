import express from 'express'
import { deleteUser, getUserDetails, login, register, updateUserDetails } from '../CRUD/userOperations.js';
import bcrypt from 'bcrypt';

const usersRouter = express.Router();

usersRouter.post('/login', async (req, res) => {
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

usersRouter.post('/logout',(req,res) => {
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

usersRouter.post('/', async (req, res) => {
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
})

usersRouter.get('/user', async (req, res) => {
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

usersRouter.get('/user/session', async (req, res) => {
    console.log('\nSession details')
    console.log(req.session.user);
    try{
        if(req.session.user){
            return res.status(200).json({loggedIn: true, username: req.session.user.username})
        }
        else{
            return res.status(200).json({loggedIn: false, username: null})
        }
    }
    catch(err){
        return res.status(500).json({message: "Server error"})
    }
})

usersRouter.patch('/user', async (req, res) => {
    try{
        const {userId} = req.session.user
        const {username, firstName, lastName} = req.body;
        // continue from here
        const response = await updateUserDetails(userId, username, firstName, lastName);
        if(response.success){
            req.session.user = {userId:userId, username:username}
            console.log('\nUpdated user details!');
            console.log(req.session.user)
            return res.status(200).json(response)
        }
        else{
            console.log(response);
            return res.status(400).json(response)
        }
    }
    catch(err){
        console.log("\ndetails update error")
        console.log(err)
        return res.status(500).json(err)
    }
})

usersRouter.delete('/user', async (req, res) => {
    try{
        const {userId, username} = req.session.user;
        const response = await deleteUser(userId,username)
        if(response.success){
            console.log('\nDeleted user!')
            console.log(req.session.user);
            req.session.destroy(err => {
                if(err) return res.status(500).json({
                    success: false,
                    message: 'Could not log out'
                });
                res.clearCookie('connect.sid');
                console.log('\nLogged out!')
                console.log(req.session);
                return res.status(200).json(response)
            })
        }
        else{
            return res.status(404).json(response)
        }
    }
    catch(err){
        return res.status(500).json(err)
    }
})

export default usersRouter;