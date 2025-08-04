import AppName from "./AppName";
import AuthStatus from "./AuthStatus";

export default function TitleBar(){
    return(
        <div className="pt-2 flex flex-row justify-between">
            <AppName></AppName>
            <AuthStatus></AuthStatus>
        </div>
    )
}