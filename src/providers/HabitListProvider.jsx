import { createContext, useContext, useState } from "react";

const HabitListContext = createContext();

export default function HabitListProvider({children}) {

    return (
        <HabitListContext.Provider value={{loggedIn, userData, login, logout}}>
            {children}
        </HabitListContext.Provider>
    )
}

export function useHabitListContext(){
    return useContext(HabitListContext)
}