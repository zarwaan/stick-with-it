import { useViewContext } from "../../providers/ViewProvider"

export default function NavButtonHighlight() {
    const {pos} = useViewContext();
    return (
        <div className="absolute w-full h-full bg--700 top-0 transition-all duration-300 ease-out flex justify-center items-center" 
        id="button-highlight"
        style={{left: `${pos * 100}%`}}>
            <div className="w-[90%] h-[80%] bg-blue-600 rounded-full"></div>
        </div>
    )
}