import AuthLayout from "./AuthLayout";
import AuthLink from "./AuthLink";
import Greeting from "./Greeting";
import InputBox from "./InputBox";
import SubmitButton from "./SubmitButton";

export default function Register() {
    return(
        <AuthLayout>
            <>
                <Greeting title={"Join Stick With It!"} 
                subtitle={"Fill your credentials and start your journey to discipline!"}>
                </Greeting>
                <InputBox cred={"First name"} type={"text"}></InputBox>
                <InputBox cred={"Last name"} type={"text"}></InputBox>
                <InputBox cred={"Username"} type={"text"}></InputBox>
                <InputBox cred={"Password"} type={"password"}></InputBox>
                <InputBox cred={"Re-enter password"} type={"password"}></InputBox>
                <SubmitButton text={"Register"} onclick={()=>{}}></SubmitButton>
                <div className="flex flex-col gap-1">
                    <AuthLink pre={"Already a member?"} linkName={"Login!"} linkTo={'/login'}></AuthLink>
                </div>
            </>
        </AuthLayout>
    )
}