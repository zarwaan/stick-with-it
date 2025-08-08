import { CalendarPlus, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

export default function CreateNewButton(){
    const ref = useRef(null);
    return(
        <motion.button className="absolute bottom-4 right-4 aspect-square flex p-3 rounded-full 
                        bg-green-800 cursor-pointer" ref={ref}
                        whileHover={{rotate: -90}}
                        transition={{duration: 0.2}}
                        whileTap={{y:4}}>
            <div className="text-white">
                {/* <CalendarPlus strokeWidth={2.5} size={40}></CalendarPlus> */}
                <Plus strokeWidth={2.5} size={40}></Plus>
            </div>
        </motion.button>
    )
}