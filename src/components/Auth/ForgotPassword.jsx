import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import AuthLayout from "./AuthLayout";
import Greeting from "./Greeting";
import InputBox from "./InputBox";
import SubmitButton from "./SubmitButton";
import Error from "../utils/Error";
import { AnimatePresence, motion } from "motion/react";
import { useAuthContext } from "../../providers/AuthProvider";
import useFetch from "../../hooks/useFetch";

export default function ForgotPassword({}) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [creds, setCreds] = useState({
        username: '',
        email: '',
        otp: '',
        pass: '',
        repass: ''
    });
    const [emailSent, setEmailSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const {data: emailData, isLoading:sendEmailLoading, error:sendEmailError, fetchData:sendEmailRequest} = useFetch(
        '/auth/send-otp',
        {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({username: creds.username})
        },
        false
    )
    const {data:otpData, isLoading:otpLoading, error:otpError, fetchData:verifyOtp} = useFetch('/auth/verify-otp',{
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({otp: creds.otp}),
    },
false);

    const sendEmail = async (e) => {
        e.preventDefault();
        console.log(creds.username);
        await sendEmailRequest();
    }

    const checkOtp = async e => {
        e.preventDefault();
        await verifyOtp();
        console.log(creds.otp);
    }

    const changePassRequest = async () => {
        return true;
    }

    useEffect(() => {
        if(sendEmailError)
            setErrorMessage(sendEmailError.message)
    },[sendEmailError])

    useEffect(() => {
        if(emailData)
            if(emailData.success)
            {
                setCreds(prev => ({
                    ...prev,
                    email: emailData.email
                }))
                setEmailSent(true)
                setErrorMessage(null)
            }
    },[emailData])

    useEffect(() => {
        if(otpError) setErrorMessage(otpError.message)
    },[otpError])

    useEffect(() => {
        if(otpData && otpData.success){
            setOtpVerified(true)
            setErrorMessage(null)
        }
    },[otpData])

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
            <form className="flex flex-col gap-4" onSubmit={(otpLoading || sendEmailLoading) ? ()=>{} : emailSent ? otpVerified ? complete : checkOtp : sendEmail}>
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
                <SubmitButton text={(otpLoading || sendEmailLoading) ? "Loading..." : emailSent ? otpVerified ? "Reset" : "Verify" : "Send email"} />
            </form>
        </AuthLayout>
    )
}