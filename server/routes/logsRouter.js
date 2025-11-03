import express from 'express'
import { returnError } from '../utils/utils.js';
import { getHabitLogs, getHabitsLoggedOnDay, logHabit } from '../CRUD/habitlogOperations.js';

const logsRouter = express.Router();

logsRouter.post('/', async (req, res) => {
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

logsRouter.get('/', async (req, res) => {
    try {
        const {userId} = req.session.user
        // const userId = 8 //only for testing
        const date = req.query.date || null;
        const month = req.query.month || null;
        const year = req.query.year || null;
        const habitId = req.query.habitId || null;

        const dateParam = !([date, month, year].some(v => v===null));

        if(habitId) {
            const response = await getHabitLogs(habitId);
            if(response.success){
                return res.status(200).json(response)
            }
            else{
                return res.status(409).json(response)
            }
        }
        
        const response = await getHabitsLoggedOnDay(date, month, year, userId)
        return res.status(200).json(response)
    }
    catch(err){
        returnError(err,res)
    }
})

export default logsRouter;