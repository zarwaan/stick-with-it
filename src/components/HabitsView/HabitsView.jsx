import { useEffect } from "react"
import { allHabits } from "./habits"
import ShowAllToggle from "./ShowAllToggle"
import { useHabitContext } from "../../providers/HabitProvider"
import Habit from "./Habit";
import { week, weekAbbr, weekSingleLetter, today } from "../../helpers/calendar";
import { AnimatePresence, motion} from "motion/react";
import HabitDetails from "./HabitDetails";

export default function HabitsView() {
    const {showAll, sideBarOpen} = useHabitContext();

    return (
        <div className="flex flex-col p-2 h-full gap-3">
            <div className="flex flex-row justify-between items-center">
                <div className="text-3xl font-bold">
                    Your Habits:
                </div>
                <ShowAllToggle></ShowAllToggle>
            </div>
            <div className="flex flex-row h-[100%] border-blue-700 overflow-hidden">
                <div className=" border-red-700 pr-3 flex flex-1 flex-col gap-3 h-[100%] overflow-y-scroll" id="habit-list">
                    {
                        // showAll ? 
                        // allHabits.map((habit,index) => {
                        //     return (<Habit key={index} habit={habit}></Habit>)
                        // })
                        // :
                        // todayHabits.map((habit,index) => {
                        //     return (<Habit key={index} habit={habit}></Habit>)
                        // })

                        allHabits.map((habit, index) => {
                            const todayDaynum = week.indexOf(today)
                            if(habit.dayArray[todayDaynum] || (!habit.dayArray[todayDaynum] && showAll)){
                                return (<Habit key={index} habit={habit}></Habit>)
                            }
                            return null;
                        })
                    }
                </div>

                <AnimatePresence initial={false}>
                    {
                        sideBarOpen ? (
                        <motion.div className="p-0 w-0 border flex flex-col"
                                    initial={{padding: "none", width: "0%", border: "none"}}
                                    animate={{padding: "", width: "35%", border: "1px solid black"}}
                                    exit={{padding: "none", width: "0%", border: "none"}}
                                    transition={{duration: 0.3, ease: "easeOut"}}>
                            <HabitDetails></HabitDetails>
                        </motion.div> ) 
                        :
                        null
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

// calc(var(--spacing) * 3)