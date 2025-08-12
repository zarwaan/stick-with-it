import { conn } from "../db/dbConn.js";

class Response {
    constructor(success,message,result){
        this.success = success
        this.message = message
        this.result = result
    }
}

export async function register(username,firstName,lastName, password) {
    try{
        const [res] = await conn.query(
            "Insert into users(username, first_name, last_name, password) values(?,?,?,?)",
            [username, firstName, lastName, password]
        );

        return new Response(true,"Inserted successfully!",res)
    }
    catch(err){
        if(err.code==='ER_DUP_ENTRY'){
            throw new Response(false,"Username already exists!",null)
        }
        throw new Response(false,"Error inserting values!",null)
    }
}