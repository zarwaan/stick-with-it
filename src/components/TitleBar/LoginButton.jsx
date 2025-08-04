import { useAuthContext } from "../../providers/AuthProvider";

export default function LoginButton(){
    const {login} = useAuthContext();

    return(
        <button className="flex flex-row bg-green-800 text-white p-2 pl-4 pr-4 cursor-pointer text-lg
                           rounded-full hover:bg-green-900 gap-1"
                onClick={login}>
            <span>Login</span>
            <i className="bi bi-box-arrow-in-right"></i>
        </button>
    )
}