import dayjs from "dayjs";
import { createContext, useContext, useEffect, useState } from "react";

const CalendarContext = createContext();

export default function CalendarProvider({children}) {
    const [year, setYear] = useState(dayjs().year())
    const [month, setMonth] = useState(dayjs().month())
    const [date, setDate] = useState(dayjs().date())
    const [view, setView] = useState(null)

    const setYearView = (year) => {
        setYear(year);
        setMonth(null);
        setDate(null);
        setView("year");
    }

    const setMonthView = (month) => {
        setMonth(month);
        setDate(null)
        setView("month");
    }

    const setDateView = (date) => {
        setDate(date)
        setView("date");
    }

    useEffect(() => setYearView(dayjs().year()),[])

    return (
        <CalendarContext.Provider value={{
            year, month, date, view, setYearView, setMonthView, setDateView, setYear, setMonth, setDate
        }}>
            {children}
        </CalendarContext.Provider>
    )
}

export function useCalendarContext() {
    return useContext(CalendarContext)
}