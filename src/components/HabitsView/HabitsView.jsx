import { useEffect } from "react"
import { allHabits,todayHabits } from "./habits"
import ShowAllToggle from "./ShowAllToggle"
import { useHabitContext } from "../../providers/HabitProvider"
import Habit from "./Habit";

export default function HabitsView() {
    const {showAll} = useHabitContext();

    return (
        <div className="flex flex-col p-2 h-full gap-3">
            <div className="flex flex-row justify-between items-center">
                <div className="text-3xl font-bold">
                    Your Habits:
                </div>
                <ShowAllToggle></ShowAllToggle>
            </div>
            <div className="flex flex-row h-[100%] border-blue-700 overflow-hidden">
                <div className=" border-red-700 pr-3 flex flex-col gap-3 w-[75%] h-[100%] overflow-y-scroll" id="habit-list">
                    {
                        showAll ? 
                        allHabits.map((habit,index) => {
                            return (<Habit key={index} habit={habit}></Habit>)
                        })
                        :
                        todayHabits.map((habit,index) => {
                            return (<Habit key={index} habit={habit}></Habit>)
                        })
                    }
                </div>
                <div className="p-3 flex-1">
                    Habit Elaboration
                </div>
            </div>
        </div>
    )
}