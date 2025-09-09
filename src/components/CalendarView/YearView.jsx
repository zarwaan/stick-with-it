import { useRef } from "react";
import { daysInMonth, firstDayOfMonth, monthList } from "../../helpers/calendar";
import { useCalendarContext } from "../../providers/CalendarProvider";
import { motion } from "motion/react";

function Month({monthName,year,monthNumber}) {
    const daysToLeave = firstDayOfMonth(monthNumber,year);
    const numberOfDays = daysInMonth(monthNumber, year);

    const nullArrayBegin = Array.from({length: daysToLeave}).fill(null);
    const daysWithoutNull = Array.from({length: numberOfDays},(_,i) => i+1)
    const nullArrayEnd = Array.from({length: 42 - daysToLeave - numberOfDays}).fill(null)

    const finalDaysToShow = [...nullArrayBegin, ...daysWithoutNull, ...nullArrayEnd]
    return (
        <div className="border rounded-2xl flex flex-col p-2 cursor-pointer gap-[5px]
                        border-3 border-green-900 bg-green-100 text-green-900">
            <div className="font-semibold border rounded-full
                    bg-green-700 text-green-50 p-[1px]">
                {monthName}
            </div>
            <div className="grid grid-cols-7 grid-rows-6 w-full flex flex-1 font-semibold">
                {
                    finalDaysToShow.map((day,index) => 
                            <div key={index} className="text-sm">
                                {day}
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default function YearView() {
    const {year, setMonthView, setYear} = useCalendarContext();
    const allMonths = monthList();
    const timerRef = useRef(null);
    
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
        <div className="h-full flex flex-col">
            <div className="text-3xl font-black text-green-900">
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
        </div>
    )
}