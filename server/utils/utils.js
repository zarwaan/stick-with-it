import nodemailer from 'nodemailer'

export const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

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

export async function sendEmail(email, receipient){
    try{
        const response = await emailTransporter.sendMail({
            from: `Password reset <${process.env.EMAIL_USER}>`,
            to: receipient,
            subject: 'OTP for password reset',
            html: email
        });
        return [true, response.messageId]
    }
    catch(err){
        console.error(err);
        return [false, ""]
    }
}

export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}