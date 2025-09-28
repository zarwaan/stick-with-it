import { getDaysOfMonthWithNulls, monthList, week, weekFromSunday } from "../../helpers/calendar";
import { useCalendarContext } from "../../providers/CalendarProvider"
import { motion } from "motion/react";
import Fade from "../utils/Fade";
import dayjs from "dayjs";
import { useHabitListContext } from "../../providers/HabitListProvider";
import { Undo2 } from "lucide-react";
import { useCallback } from "react";

const Date = ({date, month, year, dayWiseHabits, setDateView}) => {
    if(!date) return ( <div></div> )
    const isToday = () => 
        date === dayjs().date() && month === dayjs().month()+1 && year === dayjs().year()
    const habits = 
    dayWiseHabits[weekFromSunday[dayjs(year+'-'+month+'-'+date).day()]]
        return (
            <div className={`text-lg border-2 rounded-xl bg-green-100 text-green-900 font-semibold flex flex-col max-h-full cursor-pointer
                ${isToday() ? "bg-red-100 text-red-900 rounded-full" : ""}`}
                onClick={()=>setDateView(date)}>
                    <div className="">
                        {date}
                    </div>
                    <div className="text-md flex flex-center mt-2">
                        <div className="w-9/10 overflow-hidden mb-2 text-sm text-ellipsis truncate">
                        {
                            habits.map((h,i) => {
                                return (
                                    <span className="" key={i}>
                                        {h}
                                    </span>
                                )
                            })
                        }
                        </div>
                    </div>
            </div>
        )
}

const WeekTitles = () => {
    return (
        <div className="flex flex-row text-lg space-between gap-2">
            {
                weekFromSunday.map((d,i) => {
                    return (
                        <div key={i} className="w-100/7 text-white rounded-full font-semibold bg-green-800 ">
                            {d}
                        </div>
                    )
                })
            }
        </div>
    )
}

const BackButton = ({year}) => {
    const {setYearView} = useCalendarContext();
    return (
        <div className=" w-fit absolute">
            <button className="flex flex-row h-fit gap-1 cursor-pointer hover:underline"
                    onClick={()=>{
                        setYearView(year)
                    }}>
                <div className=" h-fit flex m-auto">
                    <Undo2 size={16}/>
                </div>
                <div className="text-base">
                    {year}
                </div>
            </button>
        </div>
    )
}

export default function MonthView() {
    const {month, year, setMonth, setYear, setDateView} = useCalendarContext();
    const {allHabits} = useHabitListContext();
    const dayWiseHabits = {}
    week.forEach(d => dayWiseHabits[d] = [])
    allHabits.forEach(habit => {
        week.forEach((d,i) => {
            if(habit[d.toLowerCase()] === 1)
                dayWiseHabits[d].push(habit.habit_emoji)
        })
    })
    // console.log(dayWiseHabits);

    const LeftRightButton = ({op}) => {
        return (
            <motion.button className="w-fit cursor-pointer" initial={{color: "rgb(13, 84, 43)"}} 
                        whileHover={{color: "rgb(0,130,53)"}} whileTap={{y:1}}
                        onClick={() => {
                            if(month===1 && op===-1){
                                setYear(y => y-1)
                                setMonth(12)
                            }
                            else if(month===12 && op===1){
                                setYear(y => y+1)
                                setMonth(1)
                            }
                            else
                                setMonth(month => month + op)
                        }}
                        >
                <i className={`bi ${op===-1 ? "bi-caret-left-fill" : "bi-caret-right-fill"}`} />
            </motion.button>
        )
    }

    const finalDaysToShow = getDaysOfMonthWithNulls(month,year);
    const areLastSevenNull = () => finalDaysToShow.slice(-7).every(e => e === null)
    //check again
    return (
        <motion.div className="h-[97%] flex flex-col gap-4">
            <div className="text-4xl font-bold text-green-900 relative">
                <BackButton year={year}/>
                <div className="w-5/10 flex flex-row justify-between m-auto">
                    <LeftRightButton op={-1} />
                    {monthList()[month-1]}
                    <LeftRightButton op={1} />
                </div>
            </div>
            <div className="w-9/10 ml-auto mr-auto flex flex-1 flex-col gap-2">   
                <WeekTitles/>         
                <motion.div className={`grid grid-cols-7 ${areLastSevenNull() ? 'grid-rows-5' : 'grid-rows-6'}
                 w-full flex flex-1 h-full gap-2 `}>
                    {
                        finalDaysToShow.map((d,i) => 
                            <Date date={d} key={i} month={month} year={year} dayWiseHabits={dayWiseHabits} setDateView={setDateView}/>
                        )
                    }
                </motion.div>
            </div>
        </motion.div>
    )
}