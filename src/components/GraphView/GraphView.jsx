import { motion } from "motion/react";
import ProgressRing from "../utils/ProgressRing";
import StatBox from "./StatBox";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import Loader from "../utils/Loader";
import Error from "../utils/Error";

export default function GraphView() {
    const {loggedIn} = useAuthContext();

    const [habitId, setHabitId] = useState(3)
    const {data:stats, isLoading, error, fetchData:fetchStats} = useFetch(
        `/habit/${habitId}/stats?fields=streak,expected,missed,completed`,
        {method: 'GET'},
        false
    );
    const [statsRowConfig, setStatsRowConfig] = useState([]);

    useEffect(() => {
        if(loggedIn){
            fetchStats();
        }
    },[loggedIn,habitId])

    useEffect(() => {
        if(stats)
            setStatsRowConfig([
                {
                    "statName": "Current streak",
                    "statValue": stats.result.streak.current
                },
                {
                    "statName": "Longest streak",
                    "statValue": stats.result.streak.longest
                },
                {
                    "statName": "Expected days",
                    "statValue": stats.result.expected
                },
                {
                    "statName": "Completed days",
                    "statValue": stats.result.completed
                },
                {
                    "statName": "Missed days",
                    "statValue": stats.result.missed
                },
            ])
    },[stats])

    return (
        <div className="flex flex-col w-full p-1">
            {isLoading && <Loader></Loader>}
            {error && 
                <div className="pt-10 text-xl">
                    <Error errorText="Could not load data" />
                </div>
            }
            {
                stats && 
                <div className="flex flex-row gap-4">
                    <div className="flex flex-row flex-wrap flex-1 flex-center" style={{gap: "10px"}}>
                    {
                        statsRowConfig.map((stat,index) => (
                            <div className="w-[calc(33%-10px)]" key={index}>
                                <StatBox statName={stat.statName} statValue={stat.statValue}/>
                            </div>
                        ))
                    }
                    </div>
                    <div className="w-25/100 flex">
                        <StatBox auto={false}>
                            <div className="flex flex-col gap-2">
                                <div className="text-xl font-semibold">Completion Rate</div>
                                <div className="w-7/10 m-auto   ">
                                    <ProgressRing stroke={18} progress={stats ? Math.round(stats.result.completed * 100 / stats.result.expected) : 0}></ProgressRing>
                                </div>
                            </div>
                        </StatBox>
                    </div>
                </div>
            }
        </div>
    )
}