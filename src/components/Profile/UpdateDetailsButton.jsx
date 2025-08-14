import { Check, UserPen } from "lucide-react";
import { motion } from "motion/react"
import { checkIfEmpty, checkIfEmptyArrayForm, checkMatch, CheckNameValidity, checkUsernameValidity } from "../../helpers/errorChecks";
import { useAuthContext } from "../../providers/AuthProvider";

export default function UpdateDetailsButton({editMode, setEditMode, userData, setErrorMessage}) {
    const {login} = useAuthContext();

    const handleClick = async () => {
        if(editMode){        
            const [usernameValid,message] = checkUsernameValidity(userData.username);
            if(checkIfEmptyArrayForm(["first_name","username"],userData)){
                setErrorMessage("Please fill all required fields!")
            }
            else if(!(CheckNameValidity(userData["first_name"]) && CheckNameValidity(userData["lastName"]))){
                setErrorMessage("Names can contain only letters and one hyphen/single quote")
            }
            else if(!usernameValid){
                setErrorMessage(message)
            }
            else{
                setErrorMessage(null)
                console.log(userData);
                await updateRequest()
                setEditMode(false);
            }
        }
        else{
            setEditMode(true)
        }
    }

    const updateRequest = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL_ROOT}/update-details`,{
                method: 'POST',
                headers: {
                        "Content-Type": "application/json"
                    },
                credentials: 'include',
                body: JSON.stringify({
                    username:userData['username'],
                    firstName:userData['first_name'],
                    lastName:userData['last_name']
                })
            })
            const result = await response.json();
            if(response.ok){
                // remember to setUsername from AuthProvider manually
                login(userData['username']);
                console.log("Update succesfully")
            }
            else{
                console.log(result)
            }
            // continue here
        }
        catch(err){
            console.log(err);
            console.log("Could not send request")
        }
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