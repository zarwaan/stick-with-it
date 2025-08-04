import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const login = () => {
        setLoggedIn(true);
        setUserData(
            {
                name: "TestName",
                email: "test@tmail.com",
            }
        )
    };

    const logout = () => {
        setLoggedIn(false);
        setUserData(null)
    };

    return (
        <AuthContext.Provider value={{loggedIn, userData, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext)
}