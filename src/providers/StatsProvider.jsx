import { createContext, useContext, useState } from "react";

const StatsContext = createContext();

export default function StatsProvider({children}) {
    const [habitId, setHabitId] = useState(null)

    return(

        <StatsContext.Provider value={{
            habitId, setHabitId
        }}>
            {children}
        </StatsContext.Provider>
    )
}

export function useStatsContext(){
    return useContext(StatsContext);
}