export class AuthError extends Error {
    constructor(message="Unauthorised!",code=401){
        super(message)
        this.code = code
        this.name = "AuthError"
    }
}

export function returnError(err,res){
    console.log(err);
    if(err instanceof AuthError)
        return res.status(401).json(err)
    return res.status(500).json(err)
}

export class Response {
    constructor(success,message,result){
        this.success = success
        this.message = message
        this.result = result
    }
}