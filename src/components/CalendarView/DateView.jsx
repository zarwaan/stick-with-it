import dayjs from "dayjs";
import { useCalendarContext } from "../../providers/CalendarProvider";
import { Undo2 } from "lucide-react";
import { monthList, weekFromSunday } from "../../helpers/calendar";
import { useHabitListContext } from "../../providers/HabitListProvider";

const isTodayBeforeOrAfter = (date, month, year) => {
    const thisDate = dayjs(`${year}-${month}-${date}`);
    const today = dayjs().format("YYYY-MM-DD");
    return thisDate.diff(today,'days')
    return thisDate.isSame(today, 'date') ? 0 : thisDate.isBefore(today, 'date') ? -1 : 1
}

const BackButton = ({month}) => {
    const {setMonthView} = useCalendarContext();
    return (
        <div className=" w-fit absolute">
            <button className="flex flex-row h-fit gap-1 cursor-pointer hover:underline"
                    onClick={()=>{
                        setMonthView(month)
                    }}>
                <div className=" h-fit flex m-auto">
                    <Undo2 size={16}/>
                </div>
                <div className="text-base">
                    {monthList()[month-1]}
                </div>
            </button>
        </div>
    )
}

export default function DateView() {
    const {year, month, date} = useCalendarContext();
    const dayNum =  dayjs(`${year}-${month}-${date}`).day();
    const dayName = weekFromSunday[dayNum]
    const daysFromToday = isTodayBeforeOrAfter(date, month, year);
    const {allHabits} = useHabitListContext()
    const completed = []; const remaining = [];
    allHabits.forEach((h,i) => {
        if(h.loggedToday) completed.push(h)
        else{
            if(h[dayName.toLowerCase()] === 1) remaining.push(h)
        }
    })
    return (
        <div className="h-full flex flex-col gap-1">
            <div className="text-3xl text-green-900 font-bold relative">
                <BackButton month={month}/>
                {dayName}, {date} {monthList()[month-1]} {year}
            </div>
            <div className="border flex flex-row gap-1 h-full">
                <div className="border flex flex-1 flex-col">
                    Completed:<br></br>
                    {
                        completed.map((h,i) => (
                            <div className="border flex flex-row">
                                <div className="w-2/10">{h.habit_emoji}</div>
                                <div className="w-8/10">{h.habit_title}</div>
                            </div>
                        ))
                    }
                    <br></br>
                    Remaining:<br></br>
                    {
                        remaining.map((h,i) => (
                            <div className="border flex flex-row">
                                <div className="w-2/10">{h.habit_emoji}</div>
                                <div className="w-8/10">{h.habit_title}</div>
                            </div>
                        ))
                    }
                </div>
                <div className="border w-3/10">
                    2
                </div>
            </div>
        </div>
    )
}