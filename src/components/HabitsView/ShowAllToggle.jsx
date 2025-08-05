import { useHabitContext } from "../../providers/HabitProvider";
import Toggle from "../utils/Toggle";

export default function ShowAllToggle(){
    const {setShowAll} = useHabitContext();

    return(
        <div className="flex flex-row justify-end text-xl gap-2 w-fit h-fit">
            <span>
                Show All
            </span>
            <div>
                <Toggle widthValue={10} handleClick={setShowAll}></Toggle>
            </div>
        </div>
    )
}