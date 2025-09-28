import { useCalendarContext } from "../../providers/CalendarProvider"
import YearView from "./YearView";
import MonthView from "./MonthView"
import Fade from "../utils/Fade";
import DateView from "./DateView";

export default function CalendarView() {
    const {view} = useCalendarContext();

    const isYearView = () => view === "year"
    const isMonthView = () => view === "month"
    const isDateView = () => view === "date"

    return (
        <>
        {
            isYearView() && 
            <Fade>
                <YearView/>
            </Fade>
        }
        {
            isMonthView() && 
            <Fade>
                <MonthView/>
            </Fade>
        }
        {
            isDateView() && 
            <Fade>
                <DateView/>
            </Fade>
        }
        </>
    )
}