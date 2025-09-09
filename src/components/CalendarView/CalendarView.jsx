import { useCalendarContext } from "../../providers/CalendarProvider"
import YearView from "./YearView";

export default function CalendarView() {
    const {view} = useCalendarContext();
    return (
        <>
            {view==="year" && <YearView/>}
        </>
    )
}