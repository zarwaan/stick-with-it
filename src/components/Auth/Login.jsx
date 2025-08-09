import Toggle from "../utils/Toggle";
import ContentBox from "../ContentBox";
import AuthLayout from "./AuthLayout";
import Greeting from "./Greeting";
import InputBox from "./InputBox";
import SubmitButton from "./SubmitButton";
import AuthLink from "./AuthLink";

export default function Login() {
    return (
        <AuthLayout>
            <>
                <Greeting title={"Welcome Back!"} 
                subtitle={"Fill your credentials and continue your pursuit of discipline!"}>
                </Greeting>
                <InputBox cred={"Username"} type={"text"}></InputBox>
                <InputBox cred={"Password"} type={"password"}></InputBox>
                <SubmitButton text={"Login"} onclick={()=>{}}></SubmitButton>
                <div className="flex flex-col gap-1">
                    <AuthLink pre={"New here?"} linkName={"Register now!"} linkTo={'/register'}></AuthLink>
                    <AuthLink pre={"Forgot your password?"} linkName={"Set a new one!"} linkTo={'/forgot-password'}></AuthLink>
                </div>
            </>
        </AuthLayout>
    )
}