import { useEffect, useState } from "react"
import { allHabits } from "./habits"
import ShowAllToggle from "./ShowAllToggle"
import { useHabitContext } from "../../providers/HabitProvider"
import Habit from "./Habit";
import { week, weekAbbr, weekSingleLetter, today } from "../../helpers/calendar";
import { AnimatePresence, motion} from "motion/react";
import HabitDetails from "./HabitDetails";
import CreateNewButton from "./CreateNewButton";
import { useAuthContext } from "../../providers/AuthProvider";
import NotLoggedIn from "../utils/NotLoggedIn";
import Error from "../utils/Error";
import useFetch from "../../hooks/useFetch";
import Loader from "../utils/Loader";

export default function HabitsView() {
    const {showAll, sideBarOpen} = useHabitContext();
    const {loggedIn} = useAuthContext();

    const {data: habits, isLoading, error, fetchData: fetchHabits} = useFetch(`${import.meta.env.VITE_API_URL_ROOT}/fetch-habits`,{
        method: 'POST',
        credentials: 'include',
    },false);

    useEffect(() => {
        if(loggedIn) {
            fetchHabits();
        }
    },[loggedIn])

    const HabitList = () => {
        if(isLoading){
            return (
                <Loader widthInPercent={6}></Loader>
            )
        }
        if(error){
            console.log(error)
            return (
                <div className="pt-10 text-xl">
                    <Error errorText={"Could not load data"}></Error>
                </div>
            )
        }
        if(habits){
            console.log(habits)
            return (
                habits.result.map((habit) => {
                    if(showAll || habit[today.toLowerCase()])
                        return (
                            <Habit habit={habit} key={habit['habit_id']}></Habit>
                        )
                })
            )
        }
    }

    return (
        <div className="flex flex-col p-2 h-full gap-3 relative">
            <div className="flex flex-row justify-between items-center">
                <div className="text-3xl font-bold">
                    {
                        showAll ?
                        "All habits:"
                        :
                        today+"'s habits:"
                    }
                </div>
                <ShowAllToggle></ShowAllToggle>
            </div>
            <div className="flex flex-row h-[100%] border-blue-700 overflow-hidden gap-2">
                <div className=" border-red-700 pr-3 flex flex-1 flex-col gap-3 h-[100%] overflow-y-scroll" id="habit-list">
                    {
                        loggedIn ? 
                        // allHabits.map((habit, index) => {
                        //     const todayDaynum = week.indexOf(today)
                        //     if(habit.dayArray[todayDaynum] || (!habit.dayArray[todayDaynum] && showAll)){
                        //         return (<Habit key={index} habit={habit}></Habit>)
                        //     }
                        //     return null;
                        // })
                        <HabitList></HabitList>
                        :
                        <div className="pt-10">
                            <NotLoggedIn fontSize={20} iconSize={50} strokeWidth={1}></NotLoggedIn>
                        </div>
                    }
                </div>

                <AnimatePresence initial={false}>
                    {
                        sideBarOpen ? (
                        <motion.div className="p-0 w-0 border flex flex-col rounded-xl "
                                    initial={{padding: "none", width: "0%", border: "none"}}
                                    animate={{padding: "", width: "35%", border: "0px solid black"}}
                                    exit={{padding: "none", width: "0%", border: "none"}}
                                    transition={{duration: 0.3, ease: "easeOut"}}>
                            <HabitDetails></HabitDetails>
                        </motion.div> ) 
                        :
                        null
                    }
                </AnimatePresence>
            </div>
            <CreateNewButton></CreateNewButton>
        </div>
    )
}

// calc(var(--spacing) * 3)