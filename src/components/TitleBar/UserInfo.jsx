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
    
    return (
        <div className="relative">
            <button className="flex flex-row font-semibold gap-2 text-xl text-emerald-900 cursor-pointer"
                    onClick={() => {navigate('/user')}}>
                <span className="underline">{username}</span>
                <i className="bi bi-person-circle"></i>
            </button>
        </div>
    )
}