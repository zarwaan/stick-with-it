import { Calendar1 } from "lucide-react";
export default function TodayButton({onclick}) {
    return (
        <button className="bg-green-800 text-green-50 font-normal text-base flex flex-row gap-1 p-1 flex-center
        pl-3 pr-3 rounded-xl absolute top-0 border border- right-3 top-[50%] -translate-y-[50%] cursor-pointer
        hover:bg-green-700 transition-all duration-300"
        onClick={onclick}>
            <div className="h-fit">
                <Calendar1 strokeWidth={1.5} size={18}/>
            </div>
            <div className="">
                Today
            </div>
        </button>
    )
}