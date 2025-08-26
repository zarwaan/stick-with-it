import { motion } from "motion/react";
import ProgressRing from "../utils/ProgressRing";
import StatBox from "./StatBox";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import Loader from "../utils/Loader";
import Error from "../utils/Error";
import { useHabitListContext } from "../../providers/HabitListProvider"
import Dropdown from "../utils/Dropdown/Dropdown";
import { useStatsContext } from "../../providers/StatsProvider";

export default function GraphView() {
    const {loggedIn} = useAuthContext();
    const {allHabits} = useHabitListContext();

    const {habitId, setHabitId} = useStatsContext();
    const [toShow, setToShow] = useState(null)
    const {data:stats, isLoading, error, fetchData:fetchStats} = useFetch(
        `/habit/${habitId}/stats?fields=streak,expected,missed,completed`,
        {method: 'GET'},
        false
    );
    const [statsRowConfig, setStatsRowConfig] = useState([]);

    useEffect(() => {
        if(allHabits.length > 0){
            setHabitId(allHabits[0].habit_id)
        }
    },[allHabits])

    useEffect(() => {
        if(loggedIn && habitId){
            fetchStats();
            setToShow(habitDisplay());
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

    const habitDisplay = () => { 
        const habit = allHabits.find(habit => habit.habit_id===habitId)
        return `${habit.habit_title} ${habit.habit_emoji}` 
    };

    return (
        <div className="flex flex-col w-full p-1">
            <div className="m-auto mb-2 w-full">
                <Dropdown>
                    <Dropdown.Root toShow={toShow}>
                        <Dropdown.List>
                            {
                                allHabits.map((habit) => {
                                    return (
                                        <Dropdown.Item key={habit.habit_id}
                                                        onclick={()=>setHabitId(habit.habit_id)}>
                                            {habit.habit_title} {habit.habit_emoji}
                                        </Dropdown.Item>
                                    )
                                })
                            }
                        </Dropdown.List>
                    </Dropdown.Root>
                </Dropdown>
            </div>
            {/* {isLoading && <Loader></Loader>} */}
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
                                <div className="w-7/10 m-auto">
                                    <ProgressRing 
                                        key={stats ? stats.result.completed+"-"+stats.result.expected : "empty"}
                                        stroke={18} 
                                        progress={stats ? Math.round(stats.result.completed * 100 / stats.result.expected) : 0}>
                                    </ProgressRing>
                                </div>
                            </div>
                        </StatBox>
                    </div>
                </div>
            }
        </div>
    )
}