import NavButton from "./NavButton"
import { useRef, useState } from "react"

export default function NavBar() {
    // const [left, setLeft] = useState("0%")
    const navBarRef = useRef(null);

    const NavButtonConfig = {
        habits: {
            name: "Habits",
            number: 0,
            onclick: () => {
                        //open habits section
                        console.log("hello")
                        navBarRef.current.style.setProperty("--left","0%")
                    }
        },
        graph: {
            name: "Graph",
            number: 1,
            onclick: () => {
                        console.log("hello")
                        navBarRef.current.style.setProperty("--left","100%")
                        //open graph section
                    }
        },
        calendar: {
            name: "Calendar",
            number: 2,
            onclick: () => {
                        console.log("hello")
                        navBarRef.current.style.setProperty("--left","200%")
                        //open calendar section
                    }
        },
        atAGlance: {
            name: "At a glance",
            number: 3,
            onclick: () => {
                        console.log("hello")
                        navBarRef.current.style.setProperty("--left","300%")
                        //open at a glance section
                    }
        }
    }

    return (
        <div className="bord flex flex-row w-[80%] m-auto rounded-full p-1" style={{'--left':'0%'}} ref={navBarRef}>
            {
                Object.keys(NavButtonConfig).map((button,index)=>{
                    return(
                        <NavButton button={NavButtonConfig[button]} key={index}></NavButton>
                    )
                })
            }
        </div>
    )
}