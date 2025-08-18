import { createContext, useContext, useState } from "react";
import { allHabits } from "../components/HabitsView/habits";

const HabitContext = createContext();

export default function HabitProvider({children}) {
    const [showAll, setShowAll] = useState(false)
    const [currentHabitView, setCurrentHabitView] = useState(null)
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [habitsUpdated, setHabitsUpdated] = useState(false)

    const openHabit = (habit) => {
        setCurrentHabitView(habit);
        setSideBarOpen(true);
    };

    const closeHabit = () => {
        // setCurrentHabitView(null);
        setSideBarOpen(false);
    }

    const triggerUpdate = () => {
        setHabitsUpdated(prev => prev + 1)
    }

    return (
        <HabitContext.Provider value={{
            showAll, setShowAll, currentHabitView, sideBarOpen , 
            openHabit, closeHabit, editMode, setEditMode,
            habitsUpdated, triggerUpdate
        }}>
            {children}
        </HabitContext.Provider>
    )
}

export function useHabitContext(){
    return useContext(HabitContext)
}