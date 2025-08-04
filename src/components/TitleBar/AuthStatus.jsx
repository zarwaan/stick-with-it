import { useAuthContext } from "../../providers/AuthProvider";
import LoginButton from "./LoginButton";
import UserInfo from "./UserInfo";

export default function AuthStatus({children}){
    const {loggedIn} = useAuthContext();
    return (
        <div className="mr-2 flex items-center">
            {loggedIn && <UserInfo></UserInfo>}
            {!loggedIn && <LoginButton></LoginButton>}
        </div>
    )
}