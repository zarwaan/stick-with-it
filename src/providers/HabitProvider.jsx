import { createContext, useContext, useState } from "react";

const HabitContext = createContext();

export default function HabitProvider({children}) {
    const [showAll, setShowAll] = useState(false)

    return (
        <HabitContext.Provider value={{showAll, setShowAll}}>
            {children}
        </HabitContext.Provider>
    )
}

export function useHabitContext(){
    return useContext(HabitContext)
}