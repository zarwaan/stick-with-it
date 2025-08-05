import CalendarView from "../CalendarView/CalendarView";
import GraphView from "../GraphView/GraphView";
import HabitsView from "../HabitsView/HabitsView";
import { useViewContext } from "../../providers/ViewProvider"

export default function GlanceView(){
    const {showCalendarView, showGraphView, showHabitsView} = useViewContext();

    const handleClick = (e, viewDisplayFunc) => {
        if(e.target === e.currentTarget){
            viewDisplayFunc();
        }
    }

    return(
        <div className="grid grid-cols-3 grid-rows-2 aspect-3/2 gap-3 w-full
        *:border *:bg-red-100 *:rounded-2xl *:text-xl *:p-3 *:cursor-pointer">
            <div className="col-span-2 row-span-2" onClick={(e) => handleClick(e,showHabitsView)}>
                <HabitsView></HabitsView>
            </div>
            <div className="" onClick={(e) => handleClick(e,showCalendarView)}><CalendarView></CalendarView></div>
            <div className="" onClick={(e) => handleClick(e,showGraphView)}><GraphView></GraphView></div>
        </div>
    )
}