import { LogOut, UserLock, UserPen, UserRoundX } from "lucide-react"
import { motion } from "motion/react"

export default function GenericButton({buttonName, onClick}) {
    const Icon = () => {
        return (
            <>
                {buttonName==="logout" && <LogOut size={20}></LogOut>}
                {buttonName==="changePass" && <UserLock size={20}></UserLock>}
                {buttonName==="delete" && <UserRoundX size={20}></UserRoundX>}
            </>
        )
    }
    const labels = {
        logout: "Logout",
        changePass: "Change password",
        delete: "Delete account",
    }
    const bgColor = {
        logout: "bg-red-800",
        changePass: "bg-green-800",
        delete: "bg-red-800"
    }
    return(
        <motion.button className={`flex flex-row flex-center ${bgColor[buttonName]} 
                            text-white text-base font-semibold rounded-lg p-2 pl-3 pr-3 gap-2 cursor-pointer`}
                onClick={onClick}
                whileTap={{y:2}}>
            <div className="">
                {labels[buttonName]}
            </div>
            <div className="">
                <Icon></Icon>
            </div>
        </motion.button>
    )
}