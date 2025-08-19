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
        if (habits.result.length === 0) return <div>Nothing to show!</div>
        return habits.result.map((habit) => {
            if (showAll || habit[today.toLowerCase()]) {
                return <Habit habit={habit} key={habit.habit_id} />
            }
            return null
        })
    }
    return null
}

export default function HabitsView() {
    const {showAll, sideBarOpen, habitsUpdated} = useHabitContext();
    const {loggedIn} = useAuthContext();
    const {day} = today();

    const {data: habits, isLoading, error, fetchData: fetchHabits} = useFetch(`/fetch-habits`,{
    method: 'POST',
    credentials: 'include',
    },false);

    useEffect(() => {
        if(loggedIn) {
            fetchHabits();
        }
    },[loggedIn,habitsUpdated])

    return (
        <div className="flex flex-col p-2 h-full gap-3 relative">
            <div className="flex flex-row justify-between items-center">
                <div className="text-3xl font-bold">
                    {
                        showAll ?
                        "All habits:"
                        :
                        day+"'s habits:"
                    }
                </div>
                <ShowAllToggle></ShowAllToggle>
            </div>
            <div className="flex flex-row h-[100%] border-blue-700 overflow-hidden gap-2 pb-1">
                <div className=" border-red-700 pr-3 flex flex-1 flex-col gap-3 h-[100%] overflow-y-scroll" id="habit-list">
                    {
                        loggedIn ? 
                        <HabitList
                            isLoading={isLoading}
                            error={error}
                            habits={habits}
                            showAll={showAll}
                            today={day}
                        />
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
            {
                loggedIn &&
                <CreateNewButton></CreateNewButton>
            }
        </div>
    )
}

// calc(var(--spacing) * 3)