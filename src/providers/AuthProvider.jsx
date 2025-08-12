import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);

    const login = (argUsername) => {
        setLoggedIn(true);
        setUsername(argUsername)
    };

    const logout = () => {
        setLoggedIn(false);
        setUsername(null)
    };

    return (
        <AuthContext.Provider value={{loggedIn, username, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext)
}