import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function InputBox({cred, type, setCreds, placeholder, value}) {
    const ref = useRef(null);
    const [inputType, setInputType] = useState(type);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setCreds(prev => ({
            ...prev,
            [cred]: e.target.value,
        }))
    }

    const handleClick = () => {
        setInputType(prev => prev === "password" ? "text" : "password");
        setShowPassword(prev => !prev);
    }

    return (
        <div className="flex w-full flex-center relative">
            <input type={inputType} ref={ref}
            className=" w-8/10 rounded-lg bg-white p-1 pl-2 pr-2"
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            />
            {
                placeholder.toLowerCase().includes("password") ? 
                <div className="absolute flex right-11">
                    <button className="cursor-pointer" onClick={handleClick} type="button" tabIndex={-1}>
                        {
                            showPassword ?
                            <EyeOff></EyeOff> :
                            <Eye></Eye>
                        }
                    </button>
                </div>
                :
                null
            }
        </div>
    )
}