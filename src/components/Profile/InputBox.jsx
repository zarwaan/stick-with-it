import { useState, useEffect } from "react";

export default function InputBox({credName, userData, editMode}) {
    const [editOn, setEditOn] = useState(editMode);
    useEffect(() => {
        setEditOn(editMode)
    },[editMode])
    const lables = {
        username: "Username",
        first_name: "First name",
        last_name: "Last name"
    }
    return (
        <div className="flex flex-row justify-center w-8/10 m-auto text-lg ">
            <div className=" w-3/10 font-semibold flex-center">
                {lables[credName]}:
            </div>
            <div className=" w-7/10">
                <input type="text" value={userData[credName]} 
                className={`rounded-lg w-full p-1 pl-2 pr-2 border text-base
                            ${!editOn ? "bg-slate-100 text-zinc-800":"bg-white text-black"}`} 
                            disabled={!editOn}
                />
            </div>
        </div>
    )
}