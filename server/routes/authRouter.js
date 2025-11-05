import express from 'express';
import * as dotenv from "dotenv";
import { generateOtp, sendEmail } from '../utils/utils.js';
import { getEmailFromUsername } from '../CRUD/userOperations.js';
const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({
    path: `.env.${NODE_ENV}`
});

const authRouter = express.Router();

authRouter.post('/send-otp', async (req, res) => {
    const otp = generateOtp();
    const { username } = req.body;

    try{
        const response = await getEmailFromUsername(username);

        if(!response.success) {
            console.log(response)
            return res.status(404).json(response);
        }

        const receipient = response.result.email;

        const reponse = await sendEmail(
            `<div>
                <div>
                    Here is your OTP for password reset
                </div>
                <div>
                    ${otp}
                </div>
            </div>`,
            receipient
        )
        req.session.otp = {
            code: otp,
            expiresAt: Date.now() * 5 * 60 * 1000
        }

        if(!reponse[0])
            return res.status(500).json({message:"Error occured in sending mail"})

        return res.status(200).json({success: true, email: receipient})
    }
    catch(err){
        console.error(err)
        return res.status(500).json(err);
    }
})


authRouter.post('/verify-otp',async (req, res) => {
    const otp = req.body.otp || ""
    const sessionOtp = req.session.otp || null;

    if(!sessionOtp)
        return res.status(401).json({message: "No OTP set!"})
    if(Date.now() > sessionOtp.expiresAt)
        return res.status(401).json({message: "OTP expired!"})
    if(sessionOtp.code !== otp)
        return res.status(401).json({message: "Incorrect OTP!"})

    delete req.session.otp;
    return res.status(200).json({success: true})
})

export default authRouter;
