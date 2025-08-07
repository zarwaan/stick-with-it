import { Check, Pencil, X } from "lucide-react";
import { useHabitContext } from "../../providers/HabitProvider"
import { motion } from "motion/react";
import { week } from "../../helpers/calendar";
import MarkedDay from "./MarkedDay";

export default function HabitDetails() {
    const {currentHabitView, closeHabit, editMode, setEditMode} = useHabitContext();
    return (
        <div className="flex flex-col relative gap-3 p-3 rounded-xl 
                            border-2 border-green-900 bg-green-100
        ">
            <div className="absolute flex right-2 top-2 border-blue-600">
                <motion.button onClick={() => closeHabit()} className="border-red-600 cursor-pointer"
                    whileHover={{
                        color: "#8b0000"
                    }}
                    transition={{duration: 0}}>
                    <X strokeWidth={4}></X>
                </motion.button>
            </div>
            {
                currentHabitView ? (
                <>
                    <div className="text-5xl">
                        {currentHabitView.emoji}
                    </div>
                    <div className=" text-3xl font-semibold">
                        {currentHabitView.title}
                    </div>
                    <div className=" flex justify-between text-xl font-semibold">
                        <div className=" h-fit mt-auto mb-auto">Days to practice:</div>
                        <div className=" flex flex-row">
                            <motion.button className=" cursor-pointer rounded-full p-1 aspect-square flex-center" 
                            onClick={()=>{setEditMode(mode => !mode)}}
                            whileHover={{
                                color: "rgb(255,255,255)",
                                backgroundColor: "rgba(0, 70, 0, 1)"
                            }}
                            transition={{duration: 0.15, ease: "linear"}}>
                                {
                                    editMode ?
                                    <Check strokeWidth={3} size={18}></Check>
                                    :
                                    <Pencil size={18}></Pencil>
                                }
                            </motion.button>
                        </div>
                    </div>
                    <div className=" flex flex-row flex-wrap gap-1">
                        {
                            week.map((day,index)=> 
                                <MarkedDay key={index} day={day} isMarked={currentHabitView.dayArray[index]}>
                                </MarkedDay>
                            )
                        }
                    </div>
                </> ) 
                :
                null
            }
        </div>
    )
}

