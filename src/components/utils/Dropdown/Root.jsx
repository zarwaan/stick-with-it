import { ChevronDown } from "lucide-react";
import { useDropdownContext } from "./Provider";
import { motion } from "motion/react";

export default function Root({children, toShow}) {
    const {isOpen, setIsOpen} = useDropdownContext();

    return (
            <div className="border rounded-xl w-fit m-auto p-1 pl-2 flex flex-row gap-[3px]
            pr-2 text-lg bg-green-100 text--900 font-semibold relative min-w-[50%] max-w-fit cursor-pointer"
            onClick={() => setIsOpen(prev=>!prev)}>
                <div className="flex flex-1 justify-center">{toShow}</div>
                <motion.div className="flex flex-center"
                            initial={{rotate: 0}} animate={{rotate: isOpen ? 180 : 0}} 
                            transition={{duration: 0.3}}>
                    <ChevronDown/>
                </motion.div>
                {isOpen? children : null} 
            </div>
    )
}