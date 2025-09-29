import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function ProgressRing({progress, stroke=10, toShow=[]}) {
    const [progressVal, setProgressVal] = useState(progress);
    useEffect(() => {
        setProgressVal(progress)
    },[progress]);
    
    const radius = 50;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashOffset = circumference - ((progressVal/100) * circumference)

    return(
        <svg viewBox="0 0 100 100" height={"100%"} width={"100%"}>
            
            {/* main bg */}
            <circle stroke="#0000002e"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius} cy={radius}
            >
            </circle>

            {/* ring */}
            <motion.circle stroke="#008235"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius} cy={radius}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{strokeDashoffset: circumference}}
                    animate={{strokeDashoffset: strokeDashOffset}}
                    transition={{duration: 0.7, ease: "easeInOut"}}
                    // strokeDashoffset={strokeDashOffset}
                    transform={`rotate(-90 ${radius} ${radius})`}
            >
            </motion.circle>

            {/* text inside */}
            <text x={"50%"} y={"50%"}
                    dominantBaseline={"middle"}
                    textAnchor="middle"
                    fontSize={"17"}
                    fill="#000000"
                    fontWeight={700}
            >
                <tspan x={"50%"} dy={"0"}>
                    {
                        toShow.length > 0 ? 
                        `${toShow[0]}/${toShow[1]}` :
                        `${progressVal}%`
                    }
                </tspan>
            </text>
        </svg>
    )
}