import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({children}) {
    const [loggedIn, setLoggedIn] = useState(null);
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

    useEffect(() => {
        const checkSession = async () => {
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL_ROOT}/session-details`,{
                    method: 'POST',
                    headers: {
                            "Content-Type": "application/json"
                        },
                    credentials: 'include',
                });
                const result = await response.json();
                if(response.ok){
                    if(result.loggedIn){
                        login(result.username)
                    }
                    else{
                        logout()
                    }
                }
                else{
                    console.log(result)
                }
            }
            catch(err){
                console.log(err);
                console.log("Error sending request")
            }
        }

        checkSession();
    },[])

    return (
        <AuthContext.Provider value={{loggedIn, username, login, logout, userDataUpdated, setUserDataUpdated}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext)
}