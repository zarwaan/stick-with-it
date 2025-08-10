import AuthLayout from "./AuthLayout";
import Greeting from "./Greeting";
import InputBox from "./InputBox";
import SubmitButton from "./SubmitButton";
import AuthLink from "./AuthLink";
import Error from "./Error";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    const [creds, setCreds] = useState({
        username: "",
        password: ""
    });

    const submitForm = () => {
        if(["username","password"].some(field => creds[field] === "")){
            setErrorMessage("Please fill all required fields!")
        }
        else{
            console.log("Logged in:")
            console.log(creds);
            return true;
        }
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(submitForm())
            navigate('/')
    }

    return (
        <AuthLayout>
            <Greeting title={"Welcome Back!"} 
            subtitle={"Fill your credentials and continue your pursuit of discipline!"}>
            </Greeting>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <InputBox cred={"username"} type={"text"} setCreds={setCreds} placeholder={"Username"} value={creds.username}></InputBox>
                <InputBox cred={"password"} type={"password"} setCreds={setCreds} placeholder={"Password"} value={creds.password}></InputBox>
                {
                    errorMessage && 
                    <Error errorText={errorMessage}></Error>
                }
                <SubmitButton text={"Login"}></SubmitButton>
            </form>
            <div className="flex flex-col gap-1">
                <AuthLink pre={"New here?"} linkName={"Register now!"} linkTo={'/register'}></AuthLink>
                <AuthLink pre={"Forgot your password?"} linkName={"Set a new one!"} linkTo={'/forgot-password'}></AuthLink>
            </div>
        </AuthLayout>
    )
}