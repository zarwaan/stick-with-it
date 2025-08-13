import { Check, UserPen } from "lucide-react";
import { motion } from "motion/react"

export default function UpdateDetailsButton({editMode, setEditMode}) {
    const handleClick = () => {
        setEditMode(prev => !prev)
    }
    return(
        <motion.button className={`flex flex-row flex-center bg-green-800 text-white text-base 
                            font-semibold rounded-lg p-2 pl-3 pr-3 gap-2 cursor-pointer`}
                onClick={handleClick}
                whileTap={{y:2}}>
            <div className="">
                {
                    editMode ? 
                    "Save changes"
                    :
                    "Update Details"
                }
            </div>
            <div className="">
                {
                    editMode ? 
                    <Check size={20}></Check>
                    :
                    <UserPen size={20}></UserPen>
                }
            </div>
        </motion.button>
    )
}