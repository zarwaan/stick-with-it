import { useState } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import ProfileInfo from "./ProfileInfo";
import { AnimatePresence,motion } from "motion/react";

export default function UserInfo(){
    const [showProfile, setShowProfile] = useState(false)

    const {userData} = useAuthContext();
    return (
        <div className="relative">
            <button className="flex flex-row font-semibold gap-1 text-xl text-emerald-900 cursor-pointer"
                    onClick={() => {setShowProfile(showProfile => !showProfile)}}>
                <span className="underline">{userData.name}</span>
                <i className="bi bi-person-circle"></i>
            </button>
            <AnimatePresence initial={false}>
                {showProfile && 
                <motion.div initial={{opacity:0, y:0}} animate={{opacity:1, y:12}} exit={{ opacity: 0, y:0 }} transition={{duration: 0.3}}>
                    <ProfileInfo></ProfileInfo>
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}