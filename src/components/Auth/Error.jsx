import { TriangleAlert } from "lucide-react";

export default function Error({errorText}) {
    return (
        <div className="text-red-900 font-semibold bg-pink-100 w-fit m-auto rounded-full 
                        p-1 pr-2 pl-2 flex flex-row flex-center gap-1">
            <div className=" flex">
                <TriangleAlert size={18} strokeWidth={2.5}></TriangleAlert>
            </div>
            <div className="">
                {errorText}
            </div>
        </div>
    )
}