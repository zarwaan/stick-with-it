import { UserLock } from "lucide-react";
import InfoMessage from "./InfoMessage";

export default function NotLoggedIn({fontSize, iconSize, strokeWidth}) {
    // return (
    //     <div className=" flex flex-col gap-2"
    //         style={{fontSize: fontSize+"px"}}>
    //     <div className="">Log in to view your habits!</div>
    //         <div className="flex justify-center">
    //             <UserLock size={iconSize} strokeWidth={strokeWidth}></UserLock>
    //         </div>
    //     </div>
    // )
    return(
        <InfoMessage IconToShow={UserLock} strokeWidth={1}/>
    )
}