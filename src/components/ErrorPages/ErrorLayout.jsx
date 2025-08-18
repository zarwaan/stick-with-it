import { House, LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function ErrorLayout(
    {image, errorText, navigateTo, buttonText, imageStyle={}}
) {
    const navigate = useNavigate();

    const Icon = () => {
        return (
            <>
                {navigateTo==="/" && <House size={20}></House>}
                {navigateTo==="/login" && <LogIn size={20}></LogIn>}
            </>
        )
    }

    return(
        <div className="flex flex-col justify-center gap-5">
            <div className='w-1/2 m-auto'>
                <img src={image} className="rounded-2xl" alt="" style={imageStyle}></img>
            </div>
            <div className="w-fit m-auto text-3xl font-bold bg-emerald-300 text-green-900 p-2 pl-5 pr-5 rounded-full">
                {errorText}
            </div>
            <div className="">
                <button className='bg-green-800 text-white p-2 pl-4 pr-4 rounded-xl 
                        flex flex-row m-auto flex-center gap-2 cursor-pointer'
                        onClick={()=>{navigate(navigateTo)}}>
                    <div className='font-semibold flex'>
                        {buttonText}
                    </div>
                    <div className=' h-fit'>
                        <Icon></Icon>
                    </div>
                </button>
            </div>
        </div>
    )
}