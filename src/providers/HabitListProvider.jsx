import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthProvider";
import useFetch from "../hooks/useFetch";

const HabitListContext = createContext();

export default function HabitListProvider({children}) {
    const {loggedIn} = useAuthContext();
    const [allHabits, setAllHabits] = useState([]);
    const [habitsUpdated, setHabitsUpdated] = useState(false);

    const triggerUpdate = () => {
        setHabitsUpdated(prev => prev + 1)
    }

    const {data: habits, 
            isLoading: habitsLoading, 
            error: habitsError, 
            fetchData: fetchHabits
        } = useFetch(`/habits?requireTodayLog=1`,
                        {
                            method: 'GET',
                            credentials: 'include',
                        },
                        false
                    );
    
    useEffect(() => {
        if(loggedIn){
            fetchHabits();
        }
    },[loggedIn, habitsUpdated])

    useEffect(() => {
        if(habits){
            setAllHabits(habits.result)
        }
    },[habits])

    return (
        <HabitListContext.Provider value={{
            allHabits, habitsError, habitsLoading, triggerUpdate
        }}>
            {children}
        </HabitListContext.Provider>
    )
}

export function useHabitListContext(){
    return useContext(HabitListContext)
}