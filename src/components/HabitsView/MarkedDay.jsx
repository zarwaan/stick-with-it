import { useEffect, useState } from "react"
import { useHabitContext } from "../../providers/HabitProvider";
import { motion } from "motion/react";

export default function MarkedDay({day,isMarked,index,editDay}){
    const [marked, setMarked] = useState(isMarked)
    const {editMode} = useHabitContext();
    // const dayArray = [...days];

    useEffect(() => {
        setMarked(isMarked);
    }, [isMarked])

    return (
        <motion.button className={`border-2 p-1 rounded-full pl-3 pr-3 transition-all duration-200
        ${
            marked ? "bg-green-800 text-white border-black" : "bg-slate-100 text-zinc-700 border-zinc-300"
        }
        ${ editMode ? "cursor-pointer" : "cursor-not-allowed"}`}
                onClick={() => { 
                    if(editMode){
                        setMarked(marked => !marked);
                        editDay(index)
                    } 
                }}
            >
            {day}
        </motion.button>
    )
}

// change from AllHabits.{habit}.dayArray = 