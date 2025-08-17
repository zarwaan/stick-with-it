import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Day({day, marked, editDay, index}) {
    const [isMarked, setIsMarked] = useState(marked);
    useEffect(() => { setIsMarked(marked) },[marked]);
    const handleClick = () => {
        editDay(index);
        setIsMarked(prev => !prev);
    }
    return(
        <motion.button className={`text-lg border-2 rounded-full p-2 pl-3 pr-3 cursor-pointer
            ${isMarked ? "bg-green-800 text-white border-black" : "bg-slate-100 text-zinc-700 border-zinc-300"}
        `}
        whileTap={{y: 3}}
        onClick={handleClick}>
            {day}
        </motion.button>
    )
}