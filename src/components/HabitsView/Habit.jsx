import { useEffect, useState } from "react"
import { motion } from "motion/react";
import { useHabitContext } from "../../providers/HabitProvider";
import { allHabits } from "./habits";
import { today } from "../../helpers/calendar";
import { fetchRequest } from "../../helpers/fetchRequests";

export default function Habit({habit}) {
    const [deleteHover, setDeleteHover] = useState(false);
    const {openHabit} = useHabitContext();
    const { triggerUpdate, currentHabitView, closeHabit, editMode } = useHabitContext();
    const [logged, setLogged] = useState(false)

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
                    if(currentHabitView['habit_id'] === habit['habit_id']) 
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

    const logHabit = async (e) => {
        e.stopPropagation();
        try{
            const {response, result} = await fetchRequest(
                'log-habit',
                JSON.stringify({
                    habitId: habit.habit_id
                })
            );
            if(response.ok){
                console.log('completed!')
                triggerUpdate();
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
        const checkLog = async () => {
            try{
                const {response, result} = await fetchRequest('check-logs',
                    JSON.stringify({habitId: habit.habit_id}),
                    false
                );
                if(response.ok){
                    setLogged(result.logged)
                }
                else{
                    console.log(result)
                }
            }
            catch(err){
                console.log(err)
            }
        };

        if(habit[today().day.toLowerCase()] === 1)
            checkLog();
    },[habit])

    return (
        <motion.div className="border border-2 border-green-900 rounded-full flex flex-row p-2 gap-3
                        bg-green-100 cursor-pointer"
                        whileTap={{y:2}}
                        onClick={()=> {if(!editMode) openHabit(habit)}}>
            <div className="border- border-green-700 border-5 w-[10%] rounded-full aspect-square flex-center text-3xl">
                <span className="text-shadow-[-3px_3px_5px_rgb(0_0_0_/_0.5)]">
                    {habit['habit_emoji']}
                </span>
            </div>
            <div className="border- border-blue-700 flex-1 flex items-center justify-between">
                <span className="w-fit border-\ h-fit text-2xl font-semibold">
                    {habit['habit_title']}
                </span>
                <div className="mr-2 flex flex-row gap-12">
                    {
                        habit[today().day.toLowerCase()] === 1 && !logged &&
                        <motion.button className="border-2 p-2 pl-3 pr-3 rounded-lg cursor-pointer
                                                    font-semibold text-white border-black"
                                        style={{backgroundColor: "#008235"}}
                                        whileHover={{scale:1.1, backgroundColor: "#00b000ff"}}
                                        onClick={logHabit}
                                        whileTap={{y:2}}>
                            Mark as completed
                        </motion.button>
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