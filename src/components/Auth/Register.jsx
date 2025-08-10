import { useState } from "react";
import AuthLayout from "./AuthLayout";
import AuthLink from "./AuthLink";
import Greeting from "./Greeting";
import InputBox from "./InputBox";
import SubmitButton from "./SubmitButton";
import Error from "./Error";
import { useNavigate } from "react-router-dom";
import { checkIfEmpty, checkMatch, CheckNameValidity, checkUsernameValidity } from "../../helpers/errorChecks";

export default function Register() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(submitForm())
            navigate('/');
    }

    const [creds, setCreds] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        rePassword: "",
    });

    const submitForm = () => {
        const [usernameValid,message] = checkUsernameValidity(creds.username);
        if(checkIfEmpty(creds)){
            setErrorMessage("Please fill all required fields!")
        }
        else if(!checkMatch(creds)){
            setErrorMessage("Passwords dont match!")
        }
        else if(!(CheckNameValidity(creds.firstName) && CheckNameValidity(creds.lastName))){
            setErrorMessage("Names can contain only letters and one hyphen/single quote")
        }
        else if(!usernameValid){
            setErrorMessage(message)
        }
        else{
            console.log("New user:");
            console.log(creds);
            return true;
        }
        return false;
    }

    return(
        <AuthLayout>
            <Greeting title={"Join Stick With It!"} 
            subtitle={"Fill your credentials and start your journey to discipline!"}>
            </Greeting>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <InputBox cred={"firstName"} type={"text"} setCreds={setCreds} placeholder={"First Name"} value={creds.firstName}></InputBox>
                <InputBox cred={"lastName"} type={"text"} setCreds={setCreds} placeholder={"Last Name (Optional)"} value={creds.lastName}></InputBox>
                <InputBox cred={"username"} type={"text"} setCreds={setCreds} placeholder={"Username"} value={creds.username}></InputBox>
                <InputBox cred={"password"} type={"password"} setCreds={setCreds} placeholder={"Password"} value={creds.password}></InputBox>
                <InputBox cred={"rePassword"} type={"password"} setCreds={setCreds} placeholder={"Re-enter password"} value={creds.rePassword}></InputBox>
                {
                    errorMessage &&
                    <Error errorText={errorMessage}></Error>
                }
                <SubmitButton text={"Register"}></SubmitButton>
            </form>
            <div className="flex flex-col gap-1">
                <AuthLink pre={"Already a member?"} linkName={"Login!"} linkTo={'/login'}></AuthLink>
            </div>
        </AuthLayout>
    )
}