import { useRef, useState } from "react";
import { daysInMonth, firstDayOfMonth, monthList } from "../../helpers/calendar";
import { useCalendarContext } from "../../providers/CalendarProvider";
import { motion } from "motion/react";
import dayjs from "dayjs";
import { Calendar1 } from "lucide-react";
import Fade from "../utils/Fade";

const Date = ({date, month, year}) => {
    const isToday = () => date === dayjs().date() && month === dayjs().month()+1 && year === dayjs().year()
    return (
            <div className={`text-sm ${isToday() ? "bg-red-900 text-red-50 rounded-full" : ""}`}>
                {date}
            </div>
    )
}

function Month({monthName,year,monthNumber, onclick}) {
    const { setMonthView } = useCalendarContext();
    const daysToLeave = firstDayOfMonth(monthNumber,year);
    const numberOfDays = daysInMonth(monthNumber, year);

    const nullArrayBegin = Array.from({length: daysToLeave}).fill(null);
    const daysWithoutNull = Array.from({length: numberOfDays},(_,i) => i+1)
    const nullArrayEnd = Array.from({length: 42 - daysToLeave - numberOfDays}).fill(null)
    
    const finalDaysToShow = [...nullArrayBegin, ...daysWithoutNull, ...nullArrayEnd]
    return (
        <motion.button className={`border rounded-2xl flex flex-col p-2 cursor-pointer gap-[5px]
                        border-3 border-green-900 bg-green-100 text-green-900`}
                onClick={() => setMonthView(monthNumber)}>
            <div className="font-semibold border rounded-full
                    bg-green-700 text-green-50 p-[1px]">
                {monthName}
            </div>
            <div className="grid grid-cols-7 grid-rows-6 w-full flex flex-1 font-semibold">
                {
                    finalDaysToShow.map((d,i) => 
                        <Date date={d} key={i} month={monthNumber} year={year}/>
                        )
                }
            </div>
        </motion.button>
    )
}

const TodayButton = ({setYear}) => {
    return (
        <button className="bg-green-800 text-green-50 font-normal text-lg flex flex-row gap-1 p-1 flex-center
        pl-3 pr-3 rounded-xl absolute top-0 border border-black right-3 top-[50%] -translate-y-[50%] cursor-pointer
        hover:bg-green-700 transition-all duration-300"
        onClick={() => setYear(dayjs().year())}>
            <div className="h-fit">
                <Calendar1 strokeWidth={1.5} size={20}/>
            </div>
            <div className="">
                Today
            </div>
        </button>
    )
}

export default function YearView() {
    const {year, setYear} = useCalendarContext();
    const allMonths = monthList();
    const timerRef = useRef(null);
    const yearRef = useRef(null)
    
    const once = (op) => setYear(y => y + op)

    const start = (op) => {
        once(op);
        timerRef.current = setInterval(() => setYear(y => y + op),150);
    }

    const stop = () => {
        if(timerRef.current){
            clearInterval(timerRef.current);
            timerRef.current=null
        }
    }

    const LeftRightButton = ({op}) => {
        return (
            <motion.button className="w-fit cursor-pointer" initial={{color: "rgb(13, 84, 43)"}} 
                        whileHover={{color: "rgb(0,130,53)"}} whileTap={{y:1}}
                        onMouseDown={() => start(op)}
                        onMouseUp={stop}
                        onMouseLeave={stop}
                        onTouchStart={() => start(op)}
                        onTouchEnd={stop}>
                <i className={`bi ${op===-1 ? "bi-caret-left-fill" : "bi-caret-right-fill"}`} />
            </motion.button>
        )
    }

    return (
        // <Fade>

        <motion.div className="h-full flex flex-col transition-all duration-1000" ref={yearRef}
                    >
            <div className="text-3xl font-black text-green-900 relative">
                <TodayButton setYear={setYear}/>
                <div className="w-5/10 flex flex-row justify-between m-auto">
                    <LeftRightButton op={-1} />
                    <div className="">{year}</div>
                    <LeftRightButton op={1} />
                </div>
            </div>
            <div className="grid grid-rows-3 grid-cols-4 flex flex-1 gap-3 p-3 pt-2">
                {
                    allMonths.map((month, index) => 
                        <Month key={index} 
                        monthName={month} 
                        year={year}
                        monthNumber={index + 1}/>
                    )
                }
            </div>
        </motion.div>
        // </Fade>

    )
}