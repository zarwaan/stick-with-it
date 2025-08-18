import { Check, Pencil, X } from "lucide-react";
import { useHabitContext } from "../../providers/HabitProvider"
import { motion } from "motion/react";
import { today, week } from "../../helpers/calendar";
import MarkedDay from "./MarkedDay";
import { useEffect, useState } from "react";
import { allHabits } from "./habits";

export default function HabitDetails() {
    const {currentHabitView, closeHabit, editMode, setEditMode} = useHabitContext();

    // const [days, setDays] = useState(currentHabitView.dayArray);

    // useEffect(() => {
    //     setDays(currentHabitView.dayArray)
    // },[currentHabitView])

    return (
        <div className="flex flex-col relative gap-3 p-5 rounded-xl 
                            border-2 border-green-900 bg-green-100
        ">
            <div className="absolute flex right-2 top-2 border-blue-600">
                <motion.button onClick={() => {closeHabit(); setEditMode(false);}} className="border-red-600 cursor-pointer"
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
                    <div className="text-5xl text-shadow-[-3px_3px_5px_rgb(0_0_0_/_0.5)]">
                        {currentHabitView['habit_emoji']}
                    </div>
                    <div className=" text-3xl font-semibold">
                        {currentHabitView['habit_title']}
                    </div>
                    <div className=" flex justify-between text-xl font-semibold">
                        <div className=" h-fit mt-auto mb-auto">Days to practice:</div>
                        <div className=" flex flex-row">
                            <motion.button className=" cursor-pointer rounded-full p-1 aspect-square flex-center" 
                            onClick={()=>{
                                setEditMode(mode => !mode)
                                if(editMode){
                                    // currentHabitView.updateDays(days);
                                    // console.log(allHabits);
                                }
                            }}
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
                                <MarkedDay key={index} 
                                day={day} isMarked={currentHabitView[day.toLowerCase()]}
                                index={index} 
                                // days={days}
                                // setDays={setDays}
                                >
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

