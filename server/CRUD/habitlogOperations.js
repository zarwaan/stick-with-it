import dayjs from "dayjs";
import { conn } from "../db/dbConn.js";
import { AuthError, authorise, fetchHabit } from "./habitOperations.js";

class Response {
    constructor(success,message,result){
        this.success = success
        this.message = message
        this.result = result
    }
}

// {  code,errno,sql,sqlState,sqlMessage }

export async function logHabit(habitId, userId){
    try{
        await authorise(userId, habitId);
        const habit = (await fetchHabit(habitId)).result;
        if(habit[dayjs().format('dddd').toLowerCase()]) {
            // omitting the completed_at value just gives an error so use dayjs().format("YYYY-MM-DD hh:mm:ss")
            const [res]= await conn.query(
                "insert into habits_log(user_id, habit_id, completed_at) values(?,?,?)",
                [userId,habitId,dayjs().format("YYYY-MM-DD hh:mm:ss")]
            )
            return new Response(true, "Logged successfully", res)
        }
        else{
            return new Response(false, "This habit cannot be logged today", null)
        }
    }
    catch(err){
        if(err.code && err.code === 'ER_DUP_ENTRY') return new Response(false, "Habit already logged for today", err)
        throw err
    }
}

export async function checkIfLogged(habitId){
    try{
        const [res] = await conn.query(
            "select * from habits_log where habit_id = ? and completed_date = ?",
            [
                habitId,
                dayjs().format("YYYY-MM-DD")
            ]
        );
        if(res.length === 0){
           return new Response(true, "Habit not logged", { logged: false }) 
        }
        else {
            return new Response(true, "Habit logged", { logged: true })
        }
    }
    catch(err){
        throw err
    }
}