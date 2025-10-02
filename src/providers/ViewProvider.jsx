import { createContext, useContext, useEffect, useState } from "react";

const ViewContext = createContext();

export default function ViewProvider({children}) {
    const [view, setView] = useState("habits");
    const [pos, setPos] = useState(0);

    const showHabitsView = () => {
        setView("habits");
        setPos(0);
    }

    const showGraphView = () => {
        setView("graph");
        setPos(1);
    }

    const showCalendarView = () => {
        setView("calendar");
        setPos(2);
    }

    const showGlanceView = () => {
        setView("glance");
        setPos(3);
    }

    return (
        <ViewContext.Provider value={{
            view, pos, showCalendarView, showGraphView, showGlanceView, showHabitsView
        }}>
            {children}
        </ViewContext.Provider>
    )
}

export function useViewContext(){
    return useContext(ViewContext);
}