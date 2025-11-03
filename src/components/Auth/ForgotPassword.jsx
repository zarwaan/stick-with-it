import { useState } from "react";
import { useNavigate } from "react-router-dom"
import AuthLayout from "./AuthLayout";
import Greeting from "./Greeting";
import InputBox from "./InputBox";
import SubmitButton from "./SubmitButton";
import Error from "../utils/Error";
import { AnimatePresence, motion } from "motion/react";

export default function ForgotPassword({}) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [creds, setCreds] = useState({
        email: '',
        otp: ''
    });
    const [emailSent, setEmailSent] = useState(false);

    const sendEmail = async (e) => {
        e.preventDefault();
        console.log(creds.email);
        setEmailSent(true);
    }

    const checkOtp = e => {
        e.preventDefault();
        console.log(creds.otp);
    }
    return (
        <AuthLayout>
            <Greeting 
                title={"Forgot Password"}
                subtitle={"Please enter the email address you would like to receive a One Time Password on"}
            />
            <form className="flex flex-col gap-4" onSubmit={!emailSent ? sendEmail : (e) => {e.preventDefault()}}>
                <InputBox 
                    cred={'email'}
                    setCreds={setCreds}
                    type={'email'}
                    placeholder={'eg: name@emailprovider.com'}
                    value={creds.email}
                    disabled = {emailSent}
                />
                <AnimatePresence>
                {
                    emailSent && 
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 1}}
                    >
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
                {
                    errorMessage && 
                    <Error errorText={errorMessage}></Error>
                }
                {!emailSent && <SubmitButton text={'Send email'} />}
                {emailSent && <SubmitButton text={'Submit'} />}
            </form>
        </AuthLayout>
    )
}