import AuthLayout from "./AuthLayout";
import Greeting from "./Greeting";
import InputBox from "./InputBox";
import SubmitButton from "./SubmitButton";
import AuthLink from "./AuthLink";
import Error from "./Error";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIfEmpty } from "../../helpers/errorChecks";
import { useAuthContext } from "../../providers/AuthProvider";

// dotenv.config();

export default function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const {login} = useAuthContext();

    const [creds, setCreds] = useState({
        username: "",
        password: ""
    });

    const submitForm = async () => {

        if(checkIfEmpty(creds)){
            setErrorMessage("Please fill all required fields!");
        }
        else{
            const url = `${import.meta.env.VITE_API_URL_ROOT}/login`
            console.log(`Make request to ${import.meta.env.VITE_API_URL_ROOT}/login`);
            // console.log(creds);
            try{
                const response = await fetch(url,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                    body: JSON.stringify(creds)
                });
                const result = await response.json();
                if(response.ok){
                    console.log(result.message)
                    return true;
                }
                else {
                    setErrorMessage(`${result.message}`)
                }
            }
            catch(err){
                setErrorMessage("Could not send request");
            }
        }
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(await submitForm()){
            login(creds.username);
            navigate('/')
        }
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