import { X } from "lucide-react";
import { useHabitContext } from "../../providers/HabitProvider"
import { motion } from "motion/react";

export default function HabitDetails() {
    const {currentHabitView, closeHabit} = useHabitContext();
    return (
        <div className="border flex flex-col relative">
            <div className="absolute flex right-0 border-blue-600">
                <motion.button onClick={() => closeHabit()} className="border-red-600 cursor-pointer"
                    whileHover={{
                        color: "darkred"
                    }}>
                    <X strokeWidth={4}></X>
                </motion.button>
            </div>
            <div>
                {
                    currentHabitView ?
                    currentHabitView.emoji + " " + currentHabitView.title
                    :
                    "No Habit Selected"
                }
            </div>
        </div>
    )
}

