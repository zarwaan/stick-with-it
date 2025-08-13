import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import GenericButton from "./GenericButton";
import UpdateDetailsButton from "./UpdateDetailsButton";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";

export default function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        first_name: "",
        last_name: "",
    });
    const [editMode, setEditMode] = useState(false);
    const {logout} = useAuthContext()

    const fetchUserDetails = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL_ROOT}/user-details`,{
                method: 'POST',
                headers: {
                        "Content-Type": "application/json"
                    },
                credentials: 'include'
            });
            const result = await response.json();
            if(response.ok){
                console.log(result)
                setUserData(result.result)
            }
            else{
                console.log(result)
            }
        }
        catch(err){
            console.log('Could not send request')
        }
    }

    const logoutRequest = async () => {
        const url = `${import.meta.env.VITE_API_URL_ROOT}/logout`
        try{
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            const result = await response.json();
            if(response.ok){
                logout();
                console.log(result.message);
                navigate('/');
            }
            else{
                console.error(result.message)
            }
        }
        catch(err){
            console.log(err);
            console.error('Could not send request')
        }
    }

    const changePassRequest = () => {};
    const deleteAccountRequest = () => {};

    useEffect(()=>{
        fetchUserDetails();
    },[])

    return (
        <div className="border w-6/10 bg-green-200 m-auto rounded-xl border-green-700 border-3 p-3 gap-10
                        flex flex-col">
            <div className=" text-3xl font-bold">
                Welcome!
            </div>
            <div className="flex flex-col gap-4">
            {
                Object.keys(userData).map((cred,index) => {
                    return (
                        <InputBox credName={cred} userData={userData} key={index} editMode={editMode}></InputBox>
                    )
                })
            }
            </div>
            <hr className="w-9/10 m-auto text-zinc-400"></hr>
            <div className="flex flex-row justify-around">
                <UpdateDetailsButton editMode={editMode} setEditMode={setEditMode}></UpdateDetailsButton>
                {
                    [
                        ["changePass",changePassRequest],
                        ["logout",logoutRequest],
                        ["delete",deleteAccountRequest]
                    ]
                    .map((buttonInfo,index) => {
                        return(
                            <GenericButton buttonName={buttonInfo[0]} key={index} onClick={buttonInfo[1]}></GenericButton>
                        )
                    })
                }
            </div>
        </div>
    )
}