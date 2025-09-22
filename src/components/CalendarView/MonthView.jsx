import { monthList } from "../../helpers/calendar";
import { useCalendarContext } from "../../providers/CalendarProvider"
import { motion } from "motion/react";
import Fade from "../utils/Fade";

export default function MonthView() {
    const {month} = useCalendarContext();
    return (
        <motion.div className="text-lg bg-green-300">
            {monthList()[month-1]}
        </motion.div>
    )
}