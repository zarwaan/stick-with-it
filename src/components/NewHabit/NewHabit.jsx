import { useRef, useState } from "react"
import { week } from "../../helpers/calendar";
import Day from "./Day";
import { motion } from "motion/react";
import Error from "../utils/Error";
import { checkHabitNameValidity, checkIfEmoji } from "../../helpers/errorChecks";
import InputField from "./InputField";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useHabitListContext } from "../../providers/HabitListProvider";

export default function NewHabit() {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const {triggerUpdate} = useHabitListContext();

    const [data, setData] = useState({
        title: "",
        emoji: ""
    });
    const [dayArray, setDayArray] = useState([0,0,0,0,0,0,0])

    const editDay = (index) => {
        setDayArray(prev => (
            prev.map((value,index2) => {
                if(index2===index) return value === 0 ? 1 : 0
                return value
            })
        ))
    };

    const handleSumbit = async () => {
        const [valid, message] = checkHabitNameValidity(data.title)
        if(!valid){
            setErrorMessage(message)
        }
        else if(!checkIfEmoji(data.emoji)){
            console.log('failed')
            setErrorMessage("Emoji field must contain only one single display emoji")
        }
        else{
            const mergedData = { ...data, dayArray}
            await submitNewHabit(mergedData)
        }
    }

    const submitNewHabit = async (mergedData) => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL_ROOT}/new-habit`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mergedData)
            })
            const result = await response.json();
            if(response.ok){
                console.log(mergedData)
                triggerUpdate();
                navigate('/')
            }
            else{
                setErrorMessage(result.message)
            }
        }
        catch(err){
            setErrorMessage("Error sending request")
        }
    }

    return(
        <div className="border-3 border-green-700 w-7/10 bg-green-200 m-auto rounded-xl flex flex-col pt-6 pb-6 items-center gap-8">
            <div className=" text-2xl font-semibold">
                New Habit
            </div>
            <div className=" flex flex-row w-8/10 text-lg gap-5">
                <div className=" w-8/10 text-lg">
                    {/* <div className=" w-fit font-semibold">
                        Habit name*
                    </div>
                    <input ref={nameRef} type="text"
                    className="border bg-white rounded-lg p-1 pl-2 pr-2 w-full" /> */}
                    <InputField
                        field={"title"}
                        label={"Habit name"}
                        setData={setData}
                        value={data.title}
                    ></InputField>
                </div>
                <div className=" w-2/10 text-lg">
                    <InputField
                        field={"emoji"}
                        label={"Habit emoji"}
                        setData={setData}
                        value={data.emoji}
                    ></InputField>
                    {/* <div className=" w-fit font-semibold">
                        Habit emoji*
                    </div>
                    <input type="text" ref={emojiRef}
                    className="border bg-white rounded-lg p-1 pl-2 pr-2 w-full" /> */}
                </div>
            </div>
            <div className=" w-8/10 flex flex-row"> 
                <div className=" text-lg flex-1 flex flex-center">
                    <div className="w-1/2 font-semibold">
                        Select days to practice
                    </div>
                </div>
                <div className=" flex flex-row flex-wrap flex-center gap-4 w-70/100">
                    {
                        week.map((day,index) => 
                            <Day key={index} day={day} marked={Boolean(dayArray[index])} editDay={editDay} index={index}></Day>
                        )
                    }
                </div>
            </div>
            {
                errorMessage &&
                <div className="*:border-2">
                    <Error errorText={errorMessage}></Error>
                </div>
            }
            <div className="">
                <motion.button className="rounded-lg text-lg border-2 p-2 pl-3 pr-3 font-semibold
                                        bg-emerald-700 text-white border-black cursor-pointer"
                                whileHover={{scale: 1.2}} onClick={handleSumbit}>
                    Create
                </motion.button>
            </div>
        </div>
    )
}

// marked ? "bg-green-800 text-white border-black" : "bg-slate-100 text-zinc-700 border-zinc-300"