import { useState } from "react"
import { motion } from "motion/react";
import { useHabitContext } from "../../providers/HabitProvider";
import { allHabits } from "./habits";

export default function Habit({habit}) {
    const [deleteHover, setDeleteHover] = useState(false);
    const {openHabit} = useHabitContext();

    // const handleDelete = (e) => {
    //     e.stopPropagation();
    //     habit.clearHabit(allHabits);
    // }

    return (
        <motion.div className="border border-2 border-green-900 rounded-full flex flex-row p-2 gap-3
                        bg-green-100 cursor-pointer"
                        whileTap={{y:2}}
                        onClick={()=>openHabit(habit)}>
            <div className="border- border-green-700 border-5 w-[10%] rounded-full aspect-square flex-center text-3xl">
                <span className="text-shadow-[-3px_3px_5px_rgb(0_0_0_/_0.5)]">
                    {habit['habit_emoji']}
                </span>
            </div>
            <div className="border- border-blue-700 flex-1 flex items-center justify-between">
                <span className="w-fit border-\ h-fit text-2xl font-semibold">
                    {habit['habit_title']}
                </span>
                <div className="mr-2">
                    <button className="text-red-700 text-2xl cursor-pointer" 
                        onMouseEnter={()=>setDeleteHover(true)}
                        onMouseLeave={()=>setDeleteHover(false)}
                        onClick={(e)=>{
                            e.stopPropagation();
                            // habit.clearHabit(allHabits);
                        }}>
                        <i className={`bi ${deleteHover ? "bi-trash3-fill" : "bi-trash3"}`}></i>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

//remember to stop propagation of delete