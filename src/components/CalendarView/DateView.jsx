import dayjs from "dayjs";
import { useCalendarContext } from "../../providers/CalendarProvider";
import { ListChecks, StickyNote, Undo2 } from "lucide-react";
import { daysInMonth, monthList, weekFromSunday } from "../../helpers/calendar";
import { useHabitListContext } from "../../providers/HabitListProvider";
import ProgressRing from "../utils/ProgressRing";
import InfoMessage from "../utils/InfoMessage";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import Loader from "../utils/Loader";
import { motion } from "motion/react";
import TodayButton from "./TodayButton";

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
                access ? completed ? "border-green-900 bg-green-100" : "border-red-900 bg-red-200" : "text-gray-500 bg-slate-200"
            }
        `}>
            <div className={`w-1/10 border-5 aspect-square rounded-full flex flex-center text-2xl
                ${
                    access ? completed ? "border-green-700" : "border-red-700" : "border-gray-500"
                }    
            `}>
                <span className={`${access ? "text-shadow-[-3px_3px_5px_rgb(0_0_0_/_0.5)]" : "text-transparent text-shadow-[0_0_0_rgb(0_0_0_/_0.5)]"}`}>
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
    <div className={`border ${access ? "h-5/10" : "h-full"} flex flex-col gap-1 p-2 min-h-0 border-2 border-green-900 rounded-xl`}>
        <div className="w-fit text-lg font-semibold text-green-900">
            {name}:
        </div>
        <div className="flex-1 flex flex-col gap-2 overflow-y-scroll custom-scroll pr-1">
            {children}
        </div>
    </div>
)

// const fetchCompleted = async (date, month, year) => {
//     const {data, isLoading, error, fetchData} = useFetch()
// }

export default function DateView() {
    const {year, month, date, setDate, setMonth, setYear} = useCalendarContext();
    const dayNum =  dayjs(`${year}-${month}-${date}`).day();
    const dayName = weekFromSunday[dayNum]
    const diffFromToday = isTodayBeforeOrAfter(date, month, year);
    const {allHabits} = useHabitListContext()
    const [completed, setCompleted] = useState(null)
    const [remaining, setRemaining] = useState(null)
    // const completed = []; const remaining = [];
    const {data:comp, isLoading, error, fetchData:fetchComp} = useFetch(
        `/logs?date=${date}&month=${month}&year=${year}`,
        {method: 'GET',credentials: 'include'},
        false
    );

    const LeftRightButton = ({op}) => {
        return (
            <motion.button className="w-fit cursor-pointer" initial={{color: "rgb(13, 84, 43)"}} 
                        whileHover={{color: "rgb(0,130,53)"}} whileTap={{y:1}}
                        onClick={() => {
                            if(op < 0){
                                if(date === 1){
                                    if(month === 1){
                                        setDate(31)
                                        setMonth(12)
                                        setYear(y => y-1)
                                    }
                                    else{
                                        setDate(daysInMonth(month-1,year))
                                        setMonth(m => m-1)
                                    }
                                }
                                else{
                                    setDate(d => d-1)
                                }
                            }
                            else if(op > 0){
                                if(date === daysInMonth(month,year)){
                                    if(month === 12){
                                        setDate(1)
                                        setMonth(1)
                                        setYear(y => y+1)
                                    }
                                    else{
                                        setDate(1)
                                        setMonth(m => m+1)
                                    }
                                }
                                else{
                                    setDate(d => d+1)
                                }
                            }
                        }}
                        >
                <i className={`bi ${op===-1 ? "bi-caret-left-fill" : "bi-caret-right-fill"}`} />
            </motion.button>
        )
    }

    useEffect(() => {
        if(diffFromToday === 0) { 
            const tempComp = []; const tempRem = [];   
            allHabits.forEach((h,i) => {
                if(h.loggedToday) tempComp.push(h)
                else{
                    if(h[dayName.toLowerCase()] === 1) tempRem.push(h)
                }
            })
            setCompleted(tempComp);
            setRemaining(tempRem);
        }
        else if(diffFromToday < 0){
            fetchComp();
        }
        else if(diffFromToday > 0){
            const tempRem = allHabits.filter(h => h[dayName.toLowerCase()] === 1)
            setCompleted([])
            setRemaining(tempRem)
        }
    },[date])

    useEffect(() => {
        if(comp) {
            const ids = comp.result;
            const thisDay = dayjs(`${year}-${month}-${date}`);
            const tempComp = ids.map((res) => allHabits.find((h) => h.habit_id === res.habit_id))
            const tempRem = allHabits.filter(h => 
                h[dayName.toLowerCase()] === 1 && 
                !tempComp.some(hab => hab.habit_id === h.habit_id) &&
                (dayjs(h.created_date).isBefore(thisDay) || dayjs(h.created_date).isSame(thisDay)))
            setCompleted(tempComp)
            setRemaining(tempRem)
        }
    },[comp])
    return (
        <div className="h-full flex flex-col gap-1">
            <div className="text-3xl text-green-900 font-bold relative">
                <TodayButton onclick={() => {setYear(dayjs().year()); setMonth(dayjs().month() + 1); setDate(dayjs().date())}} />
                <BackButton month={month}/>
                <div className="w-6/10 flex flex-row justify-between m-auto">
                    <LeftRightButton op={-1} />
                    {dayName}, {date} {monthList()[month-1]} {year}
                    <LeftRightButton op={1} />
                </div>
            </div>
            <div className="flex flex-row gap-2 flex-1 min-h-0 p-2">
                <div className="flex flex-1 flex-col gap-2">
                    {
                        diffFromToday <= 0 && 
                        <HabitListBox name={"Completed"}>
                            {
                                completed ?
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
                                :
                                    <Loader widthInPercent={10}/>
                            }
                        </HabitListBox>
                    }
                    <HabitListBox name={"Remaining"} access={diffFromToday <= 0}>
                        {
                            remaining ? 
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
                                        <Habit habit={h} key={i} completed={false} access={diffFromToday <= 0}/>
                                    ))
                            :
                                <Loader widthInPercent={10}/>
                        }
                    </HabitListBox>
                </div>
                <div className="flex flex-center w-3/10 border rounded-xl border-green-900 border-2">
                    <div className="aspect-square w-8/10 m-auto">
                        {
                            completed ?
                                <ProgressRing 
                                progress={completed.length + remaining.length === 0 ? 100 : Math.round((completed.length * 100)/(completed.length + remaining.length))} 
                                stroke={18}
                                toShow = {[completed.length,completed.length + remaining.length]}
                                />
                            :
                                <div className="m-auto mt-[50%] -translate-y-[50%]">
                                    <Loader widthInPercent={50}/>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}