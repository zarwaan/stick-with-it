import { createContext, useContext, useState } from "react";

const HabitContext = createContext();

export default function HabitProvider({children}) {
    const [showAll, setShowAll] = useState(false)
    const [currentHabitView, setCurrentHabitView] = useState(null)
    const [sideBarOpen, setSideBarOpen] = useState(true)

    const openHabit = (habit) => {
        setCurrentHabitView(habit);
        setSideBarOpen(true);
    };

    const closeHabit = () => {
        setCurrentHabitView(null);
        setSideBarOpen(false);
    }

    return (
        <HabitContext.Provider value={{showAll, setShowAll, currentHabitView, sideBarOpen , openHabit, closeHabit}}>
            {children}
        </HabitContext.Provider>
    )
}

export function useHabitContext(){
    return useContext(HabitContext)
}