import { useEffect, useState } from "react";
import NavButtonHighlight from "./NavButtonHighlight";

export default function NavButton({button, pos, setPos}) {
    return (
        <div className="border- border-blue-600 flex-1 box-border">
            <button onClick={button.onclick} className="bor w-full cursor-pointer relative p-3">
                {
                    button.number === 0 && <NavButtonHighlight pos={pos}></NavButtonHighlight>
                }
                <span className={`z-99 relative transition-all duration-300 ease-out font-semibold ${pos === button.number ? "text-white" : ""}`}
                >{button.name}</span>
            </button>
        </div>
    )
}