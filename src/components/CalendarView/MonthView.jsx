import { getDaysOfMonthWithNulls, monthList, week, weekFromSunday } from "../../helpers/calendar";
import { useCalendarContext } from "../../providers/CalendarProvider"
import { motion } from "motion/react";
import Fade from "../utils/Fade";
import dayjs from "dayjs";
import { useHabitListContext } from "../../providers/HabitListProvider";

const Date = ({date, month, year, dayWiseHabits}) => {
    if(!date) return ( <div></div> )
    const isToday = () => 
        date === dayjs().date() && month === dayjs().month()+1 && year === dayjs().year()
    const habits = 
    dayWiseHabits[weekFromSunday[dayjs(year+'-'+month+'-'+date).day()]]
        return (
            <div className={`text-lg border-2 rounded-xl bg-green-100 text-green-900 font-semibold flex flex-col max-h-full
                ${isToday() ? "bg-red-100 text-red-900 rounded-full" : ""}`}>
                    <div className="">
                        {date}
                    </div>
                    <div className="text-md h-14 flex flex-center">
                        <div className="h-75/100 w-9/10 overflow-hidden mb-2 text-sm text-ellipsis">
                        {
                            habits.map(h => {
                                return (
                                    <span className="">
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

export default function MonthView() {
    const {month, year} = useCalendarContext();
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
    

    const finalDaysToShow = getDaysOfMonthWithNulls(month,year);
    const areLastSevenNull = () => finalDaysToShow.slice(-7).every(e => e === null)
    //check again
    return (
        <motion.div className="h-[97%] flex flex-col gap-4">
            <div className="text-4xl font-bold text-green-900">
                {monthList()[month-1]}
            </div>
            <div className="w-9/10 ml-auto mr-auto flex flex-1 flex-col gap-2">   
                <WeekTitles/>         
                <motion.div className={`grid grid-cols-7 ${areLastSevenNull() ? 'grid-rows-5' : 'grid-rows-6'}
                 w-full flex flex-1 h-full gap-2 `}>
                    {
                        finalDaysToShow.map((d,i) => 
                            <Date date={d} key={i} month={month} year={year} dayWiseHabits={dayWiseHabits}/>
                        )
                    }
                </motion.div>
            </div>
        </motion.div>
    )
}