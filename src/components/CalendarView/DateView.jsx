import dayjs from "dayjs";
import { useCalendarContext } from "../../providers/CalendarProvider";
import { ListChecks, StickyNote, Undo2 } from "lucide-react";
import { monthList, weekFromSunday } from "../../helpers/calendar";
import { useHabitListContext } from "../../providers/HabitListProvider";
import ProgressRing from "../utils/ProgressRing";
import InfoMessage from "../utils/InfoMessage";

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

const Habit = ({habit, completed=true, access=true}) => {
    return (
        <div className={`border flex flex-row p-2 gap-2 rounded-full border-3 
            ${
                completed ? "border-green-900 bg-green-100" : "border-red-900 bg-red-200"
            }
        `}>
            <div className={`w-1/10 border-5 aspect-square rounded-full flex flex-center text-2xl
                ${
                    completed ? "border-green-700" : "border-red-700"
                }    
            `}>
                <span className="text-shadow-[-3px_3px_5px_rgb(0_0_0_/_0.5)]">
                    {habit.habit_emoji}
                </span>
            </div>
            <div className="flex-1 flex flex-center text-2xl px-2 font-semibold">
                {habit.habit_title}
            </div>
        </div>
    )
}

const HabitListBox = ({name, access=true, children}) => (
    <div className="border h-5/10 flex flex-col gap-1 p-2 min-h-0 border-2 border-green-900 rounded-xl">
        <div className="w-fit text-lg font-semibold text-green-900">
            {name}:
        </div>
        <div className="flex-1 flex flex-col gap-2 overflow-y-scroll custom-scroll pr-1">
            {children}
        </div>
    </div>
)

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
            <div className="text-3xl text-green-900 font-bold">
                <BackButton month={month}/>
                {dayName}, {date} {monthList()[month-1]} {year}
            </div>
            <div className="flex flex-row gap-2 flex-1 min-h-0">
                <div className="flex flex-1 flex-col gap-2">
                    <HabitListBox name={"Completed"}>
                        {
                            completed.length === 0 ?
                                <span className="text-xl">
                                    <InfoMessage
                                        message={"No habits completed!"}
                                        IconToShow={StickyNote}
                                        iconSize={33}
                                        strokeWidth={1.5}
                                    /> 
                                </span>
                            :
                                completed.map((h,i) => (
                                    <Habit habit={h} key={i}/>
                                ))
                        }
                    </HabitListBox>
                    <HabitListBox name={"Remaining"}>
                    {
                        remaining.length === 0 ?
                            <span className="text-xl">
                                <InfoMessage
                                    message={"No habits remaining!"}
                                    IconToShow={ListChecks}
                                    iconSize={33}
                                    strokeWidth={1.5}
                                /> 
                            </span>
                        :
                            remaining.map((h,i) => (
                                <Habit habit={h} key={i} completed={false}/>
                            ))
                    }
                    </HabitListBox>
                </div>
                <div className="flex flex-center w-3/10 border rounded-xl border-green-900 border-2">
                    <div className="aspect-square w-8/10 m-auto ">
                        <ProgressRing 
                            progress={Math.round((completed.length * 100)/(completed.length + remaining.length))} 
                            stroke={18}
                            toShow = {[completed.length,completed.length + remaining.length]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}