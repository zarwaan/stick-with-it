import express from 'express'
import { createNewHabit, deleteHabit, fetchHabit, fetchUserHabits, updateHabit } from '../CRUD/habitOperations.js';
import { returnError } from '../app.js';
import { getStats } from '../CRUD/statistics.js';

const habitRouter = express.Router();

habitRouter.get('/', async(req, res) => {
    try{
        // normal:
        const {userId} = req.session.user;
        
        // postman
        // const {userId} = req.body;
        const requireTodayLog = (req.query.requireTodayLog && req.query.requireTodayLog>0) || false
        const day = req.body?.day || null;

        const response = await fetchUserHabits(userId,day,requireTodayLog)
        if(response.success){
            console.log("\nFound")
            // console.log(response)
            return res.status(200).json(response)
        }
    }
    catch(err){
        console.log("\nError finding!")
        console.log(err)
        return res.status(500).json(err)
    }
})

habitRouter.post('/', async (req, res) => {
    try{
        // normal:
        const {userId} = req.session.user;
        
        // postman
        // const {userId} = req.body;

        const {title, emoji, dayArray} = req.body;

        const response = await createNewHabit(userId,title,emoji,dayArray)
        if(response.success){
            console.log("\nInserted new habit for user "+userId)
            console.log(response)
            return res.status(200).json(response)
        }
        else{
            return res.status(500).json(response)
        }
    }
    catch(err){
        console.log("\nError creating habit!")
        console.log(err)
        return res.status(500).json(err)
    }
})

habitRouter.get('/:id', async (req, res) => {
    try{
        const habitId = req.params.id;

        const response = await fetchHabit(habitId)
        if(response.success){
            console.log("\nFound")
            console.log(response)
            return res.status(200).json(response)
        }
        else{
            console.log("\nNot found")
            return res.status(404).json(response)
        }
    }
    catch(err){
        console.log("\nError finding!")
        console.log(err)
        return res.status(500).json(err)
    }
});

habitRouter.delete('/:id', async (req, res) => {
    try{
        const {userId} = req.session.user || -1;
        const habitId = req.params.id;

        const response = await deleteHabit(userId, habitId)
        if(response.success){
            console.log("\nDeleted")
            console.log(response)
            return res.status(200).json(response)
        }
        else{
            console.log("\nError deleting")
            return res.status(500).json(response)
        }
    }
    catch(err){
        if(err.code === 401) return res.status(401).json(err)
        console.log("\nError deleting!")
        console.log(err)
        return res.status(500).json(err)
    }
})

habitRouter.patch('/:id', async (req, res) => {
    try{
        const habitId = req.params.id;
        const {userId} = req.session.user || -1;
        const {title, emoji, dayArray} = req.body;

        const response = await updateHabit(userId,habitId,title,emoji,dayArray);

        if(response.success){
            console.log("\nUpdated")
            console.log(response)
            return res.status(200).json(response)
        }
        else{
            console.log("\Not found")
            console.log(response)
            return res.status(404).json(response)
        }
    }
    catch(err){
        if(err.code === 401) return res.status(401).json(err)
        console.log('\nError Updating')
        console.log(err)
        return res.status(500).json(err)
    }
})

habitRouter.get('/:id/stats', async (req, res) => {
    try{
        const habitId = req.params.id;
        const fields = req.query.fields?.split(',') || null;
        const year = req.query.year || "all time";
        const month = req.query.month || "all";

        const response = await getStats(habitId, fields, year, month)
        if(response.success){
            return res.status(200).json(response)
        }
        else{
            return res.status(404).json(response)
        }
    }
    catch(err){
        returnError(err,res)
    }
})

export default habitRouter;