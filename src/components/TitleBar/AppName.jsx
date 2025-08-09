import { Link } from "react-router-dom";

export default function AppName(){
    return(
        <Link to={'/'}>
            <div className="w-fit text-2xl font-[700] text-green-900 ml-2 p-2 pl-4 pr-4 bg-green-100 rounded-full border-green-900 border-2 cursor-pointer flex flex-row gap-2">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-check-big-icon lucide-square-check-big"><path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"/><path d="m9 11 3 3L22 4"/></svg>    
                </div> 
                <div className="">
                    Stick With It
                </div>
            </div>
        </Link>
    )
}