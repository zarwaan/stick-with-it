import { AnimatePresence, motion } from "motion/react";

export default function Fade({children}) {
    return (
        <AnimatePresence>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity:0}}>
                {children}
            </motion.div>
        </AnimatePresence>
    )
}