import { motion } from "motion/react"

export default function SubmitButton({text, onclick}) {
    return(
        <div className="">
            <motion.button onClick={onclick} type="submit"
            className="border bg-green-100 text-lg p-1 pl-3 pr-3 rounded-lg font-semibold cursor-pointer"
            whileTap={{y:2}}>
                {text}
            </motion.button>
        </div>
    )
}