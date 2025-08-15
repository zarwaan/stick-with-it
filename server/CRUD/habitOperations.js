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

import { convertToDatabaseStorableString } from "../../src/helpers/emojiManipulation";
import { conn } from "../db/dbConn";

class Response {
    constructor(success,message,result){
        this.success = success
        this.message = message
        this.result = result
    }
}

export async function createNewHabit(title, emoji, dayArray){
    try{
        const [res] = await conn.query(
            "INSERT INTO habits(habit_title,habit_emoji,monday,tuesday,wednesday,thursday,friday,saturday,sunday) values(?,?,?,?,?,?,?,?,?)",
            [
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