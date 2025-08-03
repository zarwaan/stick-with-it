import NavButtonHighlight from "./NavButtonHighlight";

export default function NavButton({button}) {
    return (
        <div className="border- border-blue-600 flex-1 box-border">
            <button onClick={button.onclick} className="bor w-full cursor-pointer relative p-3">
                {
                    button.number === 0 && <NavButtonHighlight></NavButtonHighlight>
                }
                <span className="z-99 relative">{button.name}</span>
            </button>
        </div>
    )
}