import { Check, Pencil, X } from "lucide-react";
import { useHabitContext } from "../../providers/HabitProvider"
import { motion } from "motion/react";
import { getOrdinalSuffix, today, week } from "../../helpers/calendar";
import MarkedDay from "./MarkedDay";
import { useEffect, useState } from "react";
import { allHabits } from "./habits";
import { pre, title } from "motion/react-client";
import { useHabitListContext } from "../../providers/HabitListProvider";
import dayjs from "dayjs";

export default function HabitDetails() {
    const {currentHabitView, closeHabit, editMode, setEditMode} = useHabitContext();
    const {triggerUpdate} = useHabitListContext();

    const [days, setDays] = useState(week.map((day) => currentHabitView[day.toLowerCase()]) || null)
    const [habitData, setHabitData] = useState({
        title: currentHabitView['habit_title'] || "",
        emoji: currentHabitView['habit_emoji'] || ""
    });

    useEffect(() => {
        setHabitData(prev => ({
            ...prev,
            title: currentHabitView['habit_title'] || "",
            emoji: currentHabitView['habit_emoji'] || ""
        }))
        setDays(week.map((day) => currentHabitView[day.toLowerCase()]) || null)
    },[currentHabitView])

    const editDay = (index) => {
        setDays((prev) => (
            prev.map((value, thisIndex) => thisIndex === index ? 1 - value : value)
        ))
    }

    const updateRequest = async () => {
        const data = {
            ...habitData,
            dayArray: days
        }

        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL_ROOT}/update-habit`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    habitId: currentHabitView['habit_id'],
                    ...habitData,
                    dayArray: days
                })
            })
            const result = await response.json();
            if(response.ok){
                triggerUpdate();
            }
            else{
                console.log(result)
            }
        }
        catch(err){
            console.log(err)
        }
    }

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
                            onClick={async ()=>{
                                if(editMode){
                                    // currentHabitView.updateDays(days);
                                    // console.log(allHabits);
                                    // console.log({
                                    //     habitId: currentHabitView['habit_id'],
                                    //     ...habitData,
                                    //     dayArray: days
                                    // })
                                    await updateRequest();
                                }
                                setEditMode(mode => !mode)
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
                                day={day} isMarked={days[index]}
                                index={index} editDay={editDay} 
                                >
                                </MarkedDay>
                            )
                        }
                    </div>
                    <div className="text-lg w-fit text-left">
                        Created on
                        <span className="">
                            {
                                dayjs(currentHabitView.created_date)
                                .format(`
                                    MMMM DD[${getOrdinalSuffix(dayjs(currentHabitView.created_date).date())},] YYYY
                                `)
                            }
                        </span>
                        <br/>
                        {dayjs().diff(dayjs(currentHabitView.created_date),'days')} days ago
                    </div>
                </> ) 
                :
                null
            }
        </div>
    )
}

