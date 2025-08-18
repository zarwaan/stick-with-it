import { useEffect, useRef, useState } from "react"

export default function Toggle({widthValue, handleClick}){
    const ref = useRef();
    const [x,setX] = useState(0);
    const [toggleOn, setToggleOn] = useState(false);

    useEffect(()=>{
        if(ref.current){
            setX(ref.current.offsetWidth - 3)
            // console.log(ref.current.offsetWidth);
        }
    },[toggleOn]);
    
    return(
        <button className="h-full cursor-pointer" onClick={()=>{setToggleOn(on => !on); handleClick(prev => !prev)}}>
            <div className={`border border--900 h-[90%] rounded-full flex p-[3px] relative 
            ${toggleOn ? "bg-green-800" : "bg-gray-400"} transition-all linear duration-300`}
            style={{width:`calc(var(--spacing) * ${widthValue})`}}>
                <div className={`bordr border-[0.5px]- aspect-square rounded-full transition-all relative linear duration-300 bg-white`}
                    ref={ref}
                    style={{left: `${toggleOn ? x : '0'}px`}}></div>
            </div>
        </button>
    )   
}

//property: width size
//property: left is width - 5 ?? somehow always USE IT