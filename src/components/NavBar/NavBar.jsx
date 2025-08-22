import { useViewContext } from "../../providers/ViewProvider"
import NavButton from "./NavButton"
import { useRef, useState } from "react"

export default function NavBar() {
    const {showGlanceView, showCalendarView, showGraphView, showHabitsView} = useViewContext();

    const NavButtonConfig = {
        habits: {
            name: "Habits",
            number: 0,
            onclick: () => {
                        showHabitsView();
                        console.log("Habits")
                    }
        },
        graph: {
            name: "Stats",
            number: 1,
            onclick: () => {
                        showGraphView();
                        console.log("Graph")
                    }
        },
        calendar: {
            name: "Calendar",
            number: 2,
            onclick: () => {
                        showCalendarView();
                        console.log("Calendar")
                    }
        },
        atAGlance: {
            name: "At a glance",
            number: 3,
            onclick: () => {
                        showGlanceView();
                        console.log("At a glance")
                    }
        }
    }

    return (
        <div className="bord flex flex-row w-[60%] m-auto rounded-full p-1 bg-emerald-100 mb-3">
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