import { useEffect, useState, useMemo } from "react"
import { allHabits } from "./habits"
import ShowAllToggle from "./ShowAllToggle"
import { useHabitContext } from "../../providers/HabitProvider"
import Habit from "./Habit";
import { AnimatePresence, motion} from "motion/react";
import HabitDetails from "./HabitDetails";
import CreateNewButton from "./CreateNewButton";
import { useAuthContext } from "../../providers/AuthProvider";
import NotLoggedIn from "../utils/NotLoggedIn";
import Error from "../utils/Error";
import useFetch from "../../hooks/useFetch";
import Loader from "../utils/Loader";
import { today } from "../../helpers/calendar";
import { useHabitListContext } from "../../providers/HabitListProvider";
import InfoMessage from "../utils/InfoMessage";
import { ListCheck, ListChecks, StickyNote, UserLock } from "lucide-react";

function Message({icon,message}) {
    return (
        <div className="pt-10 text-2xl">
            <InfoMessage IconToShow={icon} message={message} iconSize={50} strokeWidth={1}/>
        </div>
    )
}

function HabitList({ isLoading, error, habits, showAll, today }) {
    if (isLoading) {
        return <Loader widthInPercent={6} />
    }
    if (error) {
        return (
            <div className="pt-10 text-xl">
                <Error errorText="Could not load data" />
            </div>
        )
    }
    if (habits) {
        if(habits.length === 0) 
            return <Message icon={StickyNote} message={"You dont have any habits!"}/>
        
        let todayCount = 0, logCount = 0;
        
        const displayHabits = habits.map((habit) => {
            if (showAll) {
                todayCount=-1;
                return <Habit habit={habit} key={habit.habit_id} />
            }
            else{
                if((habit[today.toLowerCase()]))
                {
                    todayCount++
                    if(habit.loggedToday) logCount++
                    else return <Habit habit={habit} key={habit.habit_id} />
                }
            }
            return null
        })

        console.log(todayCount)

        if(todayCount===0)
            return <Message icon={StickyNote} message={"You don't have habits for today!"}/>
        
        if(logCount===todayCount)
            return <Message icon={ListChecks} message={"You have completed all habits for today!"}/>

        return displayHabits
    }
    return null
}

export default function HabitsView() {
    const {showAll, sideBarOpen} = useHabitContext();
    const {allHabits, habitsLoading, habitsError} = useHabitListContext();
    const {loggedIn} = useAuthContext();
    const {day} = today();

    // const {data: habits, isLoading, error, fetchData: fetchHabits} = useFetch(`/fetch-habits?requireTodayLog=1`,{
    // method: 'POST',
    // credentials: 'include',
    // },false);

    // useEffect(() => {
    //     if(loggedIn) {
    //         fetchHabits();
    //     }
    // },[loggedIn,habitsUpdated])

    return (
        <div className="flex flex-col p-2 h-full gap-3 relative">
            <div className="flex flex-row justify-between items-center">
                <div className="text-3xl font-bold">
                    {
                        showAll ?
                        "All habits:"
                        :
                        day+"'s habits left:"
                    }
                </div>
                <ShowAllToggle></ShowAllToggle>
            </div>
            <div className="flex flex-row h-[100%] border-blue-700 overflow-hidden gap-2 pb-1">
                <div className=" border-red-700 pr-3 flex flex-1 flex-col gap-3 h-[100%] overflow-y-scroll overflow-x-hidden" id="habit-list">
                    {
                        loggedIn ? 
                        <HabitList
                            isLoading={habitsLoading}
                            error={habitsError}
                            habits={allHabits}
                            showAll={showAll}
                            today={day}
                        />
                        :
                        <Message icon={UserLock} message={"Log in to view your habits!"}/>
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
            {
                loggedIn &&
                <CreateNewButton></CreateNewButton>
            }
        </div>
    )
}

// calc(var(--spacing) * 3)