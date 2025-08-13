import { useState, useEffect } from "react";
import { useAuthContext } from "../../providers/AuthProvider";
import ProfileInfo from "./ProfileInfo";
import { AnimatePresence,motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function UserInfo(){
    const [showProfile, setShowProfile] = useState(false)
    const [userData, setUserData] = useState({
        username: "",
        first_name: "",
        last_name: "",
    });
    const {username, userDataUpdated} = useAuthContext();
    const navigate = useNavigate();

    // const fetchUserDetails = async () => {
    //     try{
    //         const response = await fetch(`${import.meta.env.VITE_API_URL_ROOT}/user-details`,{
    //             method: 'POST',
    //             headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //             credentials: 'include'
    //         });
    //         const result = await response.json();
    //         if(response.ok){
    //             console.log(result)
    //             setUserData(result.result)
    //         }
    //         else{
    //             console.log(result)
    //         }
    //     }
    //     catch(err){
    //         console.log('Could not send request')
    //     }
    // }

    // useEffect(()=>{
    //     fetchUserDetails();
    // },[userDataUpdated])
    
    return (
        <div className="relative">
            <button className="flex flex-row font-semibold gap-1 text-xl text-emerald-900 cursor-pointer"
                    onClick={() => {navigate('/user')}}>
                <span className="underline">{username}</span>
                <i className="bi bi-person-circle"></i>
            </button>
            {/* <AnimatePresence initial={false}>
                {showProfile && 
                <motion.div className="" initial={{opacity:0, y:0}} animate={{opacity:1, y:12}} exit={{ opacity: 0, y:0 }} transition={{duration: 0.3}}>
                    <ProfileInfo 
                        username={userData['username']}
                        firstName={userData['first_name']}
                        lastName={userData['last_name']}
                    ></ProfileInfo>
                </motion.div>}
            </AnimatePresence> */}
        </div>
    )
}