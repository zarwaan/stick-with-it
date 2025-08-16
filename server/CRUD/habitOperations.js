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

import { convertToDatabaseStorableString, convertToEmoji } from "../../src/helpers/emojiManipulation.js";
import { conn } from "../db/dbConn.js";

class Response {
    constructor(success,message,result){
        this.success = success
        this.message = message
        this.result = result
    }
}

export async function createNewHabit(userId, title, emoji, dayArray){
    try{
        const [res] = await conn.query(
            "INSERT INTO habits(user_id,habit_title,habit_emoji,monday,tuesday,wednesday,thursday,friday,saturday,sunday) values(?,?,?,?,?,?,?,?,?,?)",
            [
                userId,
                title,
                convertToDatabaseStorableString(emoji),
                ...dayArray
            ]
        );
        return new Response(true, "Inserted succesfully", res)
    }
    catch(err){
        throw new Response(false, "Database error", null)
    }
}

export async function fetchUserHabits(userId, day=null){
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
            return new Response(true,"Found successfully",
                res.map((result) => { 
                    return { 
                        ...result, 
                        habit_emoji: convertToEmoji(result['habit_emoji'])
                    }
                })
            )
        }
    }
    catch(err){
        return new Response(false,"Database error",null)
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
        return new Response(false,"Database error",null)
    }
}
