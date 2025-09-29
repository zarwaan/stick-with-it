import dayjs from "dayjs";
import { useCalendarContext } from "../../providers/CalendarProvider";
import { Undo2 } from "lucide-react";
import { monthList, weekFromSunday } from "../../helpers/calendar";
import { useHabitListContext } from "../../providers/HabitListProvider";
import ProgressRing from "../utils/ProgressRing";

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
        <div className="border flex flex-row p-1 gap-2 rounded-full">
            <div className="w-1/10 border aspect-square rounded-full">
                {habit.habit_emoji}
            </div>
            <div className="flex-1">
                {habit.habit_title}
            </div>
        </div>
    )
}

const HabitListBox = ({name, access=true, children}) => (
    <div className="border border-blue-500 h-5/10 flex flex-col flex flex-col gap-1">
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
            <div className="flex flex-row gap-1 flex-1 min-h-0">
                <div className="border flex flex-1 flex-col gap-">
                    <HabitListBox name={"Completed"}>
                        {
                            completed.map((h,i) => (
                                <Habit habit={h} key={i}/>
                            ))
                        }
                    </HabitListBox>
                    <HabitListBox name={"Remaining"}>
                    {
                        remaining.map((h,i) => (
                            <Habit habit={h} key={i}/>
                        ))
                    }
                    </HabitListBox>
                </div>
                <div className="border w-3/10">
                    <div className="aspect-square w-8/10 border m-auto mt-[10%]">
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