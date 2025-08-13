import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [userDataUpdated, setUserDataUpdated] = useState(false);

    const login = (argUsername) => {
        setLoggedIn(true);
        setUsername(argUsername)
    };

    const logout = () => {
        setLoggedIn(false);
        setUsername(null)
    };

    return (
        <AuthContext.Provider value={{loggedIn, username, login, logout, userDataUpdated, setUserDataUpdated}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext)
}