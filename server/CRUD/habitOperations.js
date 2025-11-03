// // IMPORTANT // //
// // storing and retrieving emojis from db

// // emoji
// const a = "👨‍👩‍👧‍👦" 

// // array of codepoints
// const arr = Array.from(a).map(ch => ch.codePointAt(0));

// // store in database with
// const idk = JSON.stringify(arr)

// // retrieve from database
// // get the array back and
// const arrAgain = JSON.parse(idk)
// const emoji = String.fromCodePoint(...arrAgain)

import dayjs from "dayjs";
import { convertToDatabaseStorableString, convertToEmoji } from "../../src/helpers/emojiManipulation.js";
import { conn } from "../db/dbConn.js";
import { checkIfLogged } from "./habitlogOperations.js";
import { Response } from '../utils/utils.js'

export class AuthError extends Error {
    constructor(message="Unauthorised!",code=401){
        super(message)
        this.code = code
        this.name = "AuthError"
    }
}

export async function authorise(userId, habitId){
    const [res] = await conn.query(
        "Select user_id from habits where habit_id = ?",
        [habitId]
    );
    if(res.length===0 || userId !== res[0]['user_id']){
        throw new AuthError();
    }
}

export async function createNewHabit(userId, title, emoji, dayArray){
    try{
        const [res] = await conn.query(
            "INSERT INTO habits(user_id,habit_title,habit_emoji,monday,tuesday,wednesday,thursday,friday,saturday,sunday,created_date) values(?,?,?,?,?,?,?,?,?,?,?)",
            [
                userId,
                title,
                convertToDatabaseStorableString(emoji),
                ...dayArray,
                dayjs().format("YYYY-MM-DD")
            ]
        );
        return new Response(true, "Inserted succesfully", res)
    }
    catch(err){
        throw new Response(false, "Database error", null)
    }
}

export async function fetchUserHabits(userId, day=null, requireTodayLog=false){
    const query = 
    day ?
    `select * from habits where user_id = ? and ${day} = ?` :
    `select * from habits where user_id = ?`;
    const values = day ? [userId,1] : [userId]
    try{
        const [res] = await conn.query(query,values)
        if(res.length===0){
            return new Response(true,"No habits to show!",res)
        }
        else{
            const habits = await Promise.all(res.map(async (result) => { 
                                let toReturn = {
                                    ...result, 
                                    habit_emoji: convertToEmoji(result['habit_emoji'])
                                }
                                if(requireTodayLog)
                                {
                                    const loggedToday = await checkIfLogged(result.habit_id);
                                    toReturn = {
                                        ...toReturn,
                                        loggedToday: loggedToday.result.logged
                                    }
                                }
                                return toReturn
                            }))
            return new Response(true,"Found successfully",habits)
        }
    } 
    catch(err){
        throw new Response(false,"Database error",null)
    }
}

export async function fetchHabit(habitId) {
    try{
        const [res] = await conn.query(
            "select * from habits where habit_id = ?",
            [habitId]
        )
        if(res.length===0){
            return new Response(false,"No such habit exists!",null)
        }
        else{
            return new Response(true,"Found successfully",res[0])
        }
    }
    catch(err){
        throw new Response(false,"Database error",null)
    }
}

export async function deleteHabit(userId, habitId){
    try{
        await authorise(userId, habitId);
        const [res] = await conn.query(
            "delete from habits where habit_id = ?",
            [habitId]
        );
        return new Response(true, "Deleted successfully",res)
    }
    catch(err){
        if(err instanceof AuthError) throw err
        throw new Response(false, "Database error", null)
    }
}

export async function updateHabit(userId, habitId, title, emoji, dayArray){
    try{
        await authorise(userId, habitId);
        const [res] = await conn.query(
            `update habits set
                monday=?, tuesday=?, wednesday=?, thursday=?, friday=?, saturday=?, sunday=?
                    where habit_id = ?`,
            [
                ...dayArray,
                habitId
            ]
        )
        if(res.affectedRows===0){
            // should never be possible but will not affect anything
            return new Response(true,"Habit doesn't exist!",null)
        }
        else{
            return new Response(true,"Updated successfully",res)
        }
    }
    catch(err){
        if(err instanceof AuthError) throw err
        throw new Response(false,"Error inserting values!",null)
    }
}