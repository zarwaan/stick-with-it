import { useViewContext } from "../../providers/ViewProvider"
import NavButton from "./NavButton"
import { useRef, useState } from "react"

export default function NavBar() {
    // const [left, setLeft] = useState("0%")
    // const [pos, setPos] = useState(0)
    const {setView, pos, setPos} = useViewContext()

    const NavButtonConfig = {
        habits: {
            name: "Habits",
            number: 0,
            onclick: () => {
                        //open habits section
                        setView("habits")
                        console.log("Habits")
                        setPos(0);
                    }
        },
        graph: {
            name: "Graph",
            number: 1,
            onclick: () => {
                        setView("graph")
                        console.log("Graph")
                        setPos(1);
                        //open graph section
                    }
        },
        calendar: {
            name: "Calendar",
            number: 2,
            onclick: () => {
                        setView("calendar")
                        console.log("Calendar")
                        setPos(2);
                        //open calendar section
                    }
        },
        atAGlance: {
            name: "At a glance",
            number: 3,
            onclick: () => {
                        setView("glance")
                        console.log("At a glance")
                        setPos(3);
                        //open at a glance section
                    }
        }
    }

    return (
        <div className="bord flex flex-row w-[60%] m-auto rounded-full p-1 bg-indigo-100 mb-3">
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