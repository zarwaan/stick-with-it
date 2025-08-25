import { useEffect, useState } from "react";
import AppName from "./AppName";
import AuthStatus from "./AuthStatus";
import { useLocation } from "react-router-dom";

export default function TitleBar(){
    const [isAuth, setIsAuth] = useState(false);
    const location = useLocation();
    useEffect(() => {
        (location.pathname==='/login' || location.pathname==='/register' || location.pathname==='/user') ?
        setIsAuth(true) : setIsAuth(false)
    },[location])
    return(
        <div className="pt-2 flex flex-row justify-between pb-2">
            <AppName></AppName>
            {isAuth ? null : <AuthStatus></AuthStatus>}
        </div>
    )
}