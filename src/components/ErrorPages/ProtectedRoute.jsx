import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";
import Unauthorised401 from "./Unauthorised401";

export default function ProtectedRoute() {
    const {loggedIn} = useAuthContext();
    if(!loggedIn){
        return <Unauthorised401></Unauthorised401>
    }
    return <Outlet></Outlet>
}