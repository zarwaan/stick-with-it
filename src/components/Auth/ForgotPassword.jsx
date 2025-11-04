import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import AuthLayout from "./AuthLayout";
import Greeting from "./Greeting";
import InputBox from "./InputBox";
import SubmitButton from "./SubmitButton";
import Error from "../utils/Error";
import { AnimatePresence, motion } from "motion/react";
import { useAuthContext } from "../../providers/AuthProvider";

export default function ForgotPassword({}) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [creds, setCreds] = useState({
        username: '',
        otp: '',
        pass: '',
        repass: ''
    });
    const [emailSent, setEmailSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const sendEmail = async (e) => {
        if(e) e.preventDefault();
        console.log(creds.username);
        setEmailSent(true);
    }

    const checkOtp = e => {
        e.preventDefault();
        setOtpVerified(true);
        console.log(creds.otp);
    }

    const changePassRequest = async () => {
        return true;
    }

    const complete = async (e) => {
        e.preventDefault();
        if(creds.pass !== creds.repass || creds.pass === ""){
            setErrorMessage("Passwords don't match!")
            return;
        }
        if(await changePassRequest())
            navigate('/')
    }

    return (
        <AuthLayout>
            <Greeting 
                title={"Forgot Password"}
                subtitle={
                    !emailSent ?
                    "Please enter your username"
                    :
                    "A mail containing an OTP to reset your password has been sent on your associated email id"
                }
            />
            <form className="flex flex-col gap-4" onSubmit={emailSent ? otpVerified ? complete : checkOtp : sendEmail}>
                <InputBox 
                    cred={'username'}
                    setCreds={setCreds}
                    type={'text'}
                    placeholder={'username'}
                    value={creds.username}
                    disabled = {emailSent}
                />
                <AnimatePresence>
                {
                    emailSent && 
                    <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                    className="flex flex-col gap-4"
                    >
                        <InputBox 
                            cred={'email'}
                            setCreds={setCreds}
                            type={'email'}
                            placeholder={'name@emailprovider.com'}
                            value={creds.email}
                            disabled = {emailSent}
                        />
                        <InputBox 
                        cred={'otp'}
                        setCreds={setCreds}
                        type={'text'}
                        placeholder={'Enter OTP'}
                        value={creds.otp}
                        />
                    </motion.div>
                }
                </AnimatePresence>
                <AnimatePresence>
                    {
                        otpVerified &&
                        <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 1}}
                        className="flex flex-col gap-4"
                        >
                            <InputBox
                            cred={'pass'}
                            setCreds={setCreds}
                            type={'password'}
                            placeholder={'Enter new password'}
                            value={creds.pass}
                            />
                            <InputBox
                            cred={'repass'}
                            setCreds={setCreds}
                            type={'password'}
                            placeholder={'Re-enter new password'}
                            value={creds.repass}
                            />
                        </motion.div>
                    }
                </AnimatePresence>
                {
                    errorMessage && 
                    <Error errorText={errorMessage}></Error>
                }
                <SubmitButton text={emailSent ? otpVerified ? "Reset" : "Verify" : "Send email"} />
            </form>
        </AuthLayout>
    )
}