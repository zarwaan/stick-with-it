import { conn } from "../db/dbConn.js";
import bcrypt from 'bcrypt';

class Response {
    constructor(success,message,result){
        this.success = success
        this.message = message
        this.result = result
    }
}

export async function register(username, firstName, lastName, password) {
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

export async function login(username, password){
    try{
        const [res] = await conn.query(
            "Select * from users where username=?",
            [username]
        );
        if(res.length===0){
            return new Response(false,"No such username exists!",null)
        }
        else{
            const match = await bcrypt.compare(password,res[0]["password"])
            if(!match){
                return new Response(false,"Incorrect password!",null)
            }
            return new Response(true,"Login successful",{userId: res[0]["user_id"], username: res[0]['username']})
        }
    }
    catch(err){
        throw new Response(false,"Database fetch error",null)
    }
}