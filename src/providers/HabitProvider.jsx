import { createContext, useContext, useState } from "react";
import { allHabits } from "../components/HabitsView/habits";

const HabitContext = createContext();

export default function HabitProvider({children}) {
    const [showAll, setShowAll] = useState(false)
    const [currentHabitView, setCurrentHabitView] = useState({
        id: 1,
        title: "Read a book",
        emoji: "📖",
        dayArray: [0,0,0,0,0,1,1]
    })
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [editMode, setEditMode] = useState(false)

    const openHabit = (habit) => {
        setCurrentHabitView(habit);
        setSideBarOpen(true);
    };

    const closeHabit = () => {
        // setCurrentHabitView(null);
        setSideBarOpen(false);
    }

    return (
        <HabitContext.Provider value={{showAll, setShowAll, currentHabitView, sideBarOpen , openHabit, closeHabit, editMode, setEditMode}}>
            {children}
        </HabitContext.Provider>
    )
}

export function useHabitContext(){
    return useContext(HabitContext)
}