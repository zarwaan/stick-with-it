import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react";
import { useHabitContext } from "../../providers/HabitProvider";
import { allHabits } from "./habits";
import { today } from "../../helpers/calendar";
import { fetchRequest } from "../../helpers/fetchRequests";

export default function Habit({habit}) {
    const [deleteHover, setDeleteHover] = useState(false);
    const {openHabit} = useHabitContext();
    const { triggerUpdate, currentHabitView, closeHabit, editMode } = useHabitContext();
    const [isExiting, setIsExiting] = useState(false)
    const animationTime = 2.3
    const [x, setX] = useState(0)
    const emojiContRef = useRef(null)
    const habitContRef = useRef(null)
    const [showCompleted, setShowCompleted] = useState(false);
    const updateTriggerTimeout = useRef(null);

    const transition = {
        duration: animationTime, ease: "anticipate"
    }

    const deleteRequest = async () => {
        if(confirm(`Are you sure you want to delete "${habit['habit_title']}"?`)) {
            try{
                const response = await fetch(`${import.meta.env.VITE_API_URL_ROOT}/delete-habit`,{
                    method: 'POST',
                    headers: {
                            "Content-Type": "application/json"
                        },
                    credentials: 'include',
                    body: JSON.stringify({habitId : habit['habit_id']})
                })
                const result = await response.json();
                if(response.ok){
                    triggerUpdate();
                    if(currentHabitView && currentHabitView['habit_id'] === habit['habit_id']) 
                        closeHabit();
                }
                else{
                    console.error(result)
                }
            }
            catch(err){
                console.error(err)
            }
        }
    }

    const logRequest = async (e) => { 
        e.stopPropagation();
        setIsExiting(true);
        await logHabit();
        setTimeout(() => setShowCompleted(true), (animationTime - 1.5) * 1000) 
        updateTriggerTimeout.current = setTimeout(() => triggerUpdate(), (animationTime) * 1200) 
        // const timeout = setTimeout(() => { clearTimeout(timeout); setIsExiting(false); setShowCompleted(false) }, animationTime * 1200)
    }

    const logHabit = async () => {
        try{
            const {response, result} = await fetchRequest(
                'log-habit',
                JSON.stringify({
                    habitId: habit.habit_id
                })
            );
            if(response.ok){
                console.log('completed!')
            }
            else{
                console.log(result.message)
            }
        }
        catch(err){
            console.log("Some error occurred! ")
            console.log(err)
        }
    }

    useEffect(() => {
        setX(habitContRef.current.offsetWidth - emojiContRef.current.offsetWidth - 20)
    },[isExiting])

    useEffect(() => {
        return () => {
            if(updateTriggerTimeout.current) 
                clearTimeout(updateTriggerTimeout.current)
        }
    },[])

    return (
        <motion.div className="border border-2 border-green-900 rounded-full flex flex-row p-[9px] gap-3
                        bg-green-100 cursor-pointer relative"
                        whileTap={{y:2}}
                        onClick={()=> {if(!editMode) openHabit(habit)}}
                        ref={habitContRef}>
            <motion.div className="absolute bg-black top-0 left-0 bottom-0 rounded-full 
            border- border-green-900 bg-green-100"
            animate={{ right: isExiting ? 0 : "100%"}} transition={transition}
            >
                {
                    showCompleted ?
                    <motion.div initial={{top:"50%", opacity:0}} animate={{top:"50%",opacity:1}} transition={{duration:1}}
                    className="text-5xl font-bold text-green-900 absolute -translate-1/2 left-1/2 top-0">
                        Completed! 
                    </motion.div>
                    : null
                }
            </motion.div>
            <motion.div className="border- border-green-700 border-5 w-[10%] rounded-full aspect-square flex-center text-3xl relative bg-green-100"
                animate={{ 
                    rotate: isExiting ? 1080 : 0,
                    left: isExiting ? x : 0
                }} 
                transition={transition}
                ref={emojiContRef}>
                <span className="text-shadow-[-3px_3px_5px_rgb(0_0_0_/_0.5)]">
                    {habit['habit_emoji']}
                </span>
            </motion.div>
            <div className="border- border-blue-700 flex-1 flex items-center justify-between">
                <span className="w-fit border-\ h-fit text-2xl font-semibold">
                    {habit['habit_title']}
                </span>
                <div className="mr-2 flex flex-row gap-12">
                    {
                        habit[today().day.toLowerCase()] === 1 && !habit.loggedToday && !isExiting &&
                        <motion.button className="border-2 p-2 pl-3 pr-3 rounded-lg cursor-pointer
                                                    font-semibold text-white border-black"
                                        style={{backgroundColor: "#008235"}}
                                        whileHover={{
                                            scale: 1.1, 
                                            backgroundColor: "#00b000ff"
                                        }}
                                        onClick={logRequest}
                                        whileTap={{y:2}}>
                            Mark as completed
                        </motion.button>
                    }
                    {
                        habit[today().day.toLowerCase()] === 1 && habit.loggedToday && !isExiting && 
                        <div className="text-xl font-bold text-green-900">
                            Completed!
                        </div>
                    }
                    <button className="text-red-700 text-2xl cursor-pointer" 
                        onMouseEnter={()=>setDeleteHover(true)}
                        onMouseLeave={()=>setDeleteHover(false)}
                        onClick={async (e)=>{
                            e.stopPropagation();
                            await deleteRequest();
                        }}>
                        <i className={`bi ${deleteHover ? "bi-trash3-fill" : "bi-trash3"}`}></i>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

//remember to stop propagation of delete