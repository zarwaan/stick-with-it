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
import SWIStackedBarChart from "../utils/Charts/SWIStackedBarChart";
import { monthList, week, yearList } from "../../helpers/calendar";
import SWIAreaChart from "../utils/Charts/SWIAreaChart";
import InfoMessage from "../utils/InfoMessage";
import { ChartColumnIncreasing } from "lucide-react";
import dayjs from "dayjs";

export default function GraphView() {
    const {loggedIn} = useAuthContext();
    const {allHabits} = useHabitListContext();

    const {habitId, setHabitId} = useStatsContext();
    const [toShow, setToShow] = useState(null)
    const {data:stats, isLoading, error, fetchData:fetchStats} = useFetch(
        `/habit/${habitId}/stats`,
        {method: 'GET'},
        false
    );
    const [stackedChartData, setStackedChartData] = useState([]);
    const [statsRowConfig, setStatsRowConfig] = useState([]);
    const [areaChartData, setAreaChartData] = useState([]);
    const [timeList, setTimeList] = useState({months: [], years: []})
    const [interval, setInterval] = useState({
        year: "all time",
        month: "all"
    })
    const [intervalList, setIntervalList] = useState({
        years: ["all time"],
        months: ["all"]
    })
    const [trigger, setTrigger] = useState(1);
    const triggerFetch = () => setTrigger(count => count + 1)

    const NotEnoughData = () => (
        <div className="text-xl font-semibold mt-5">
            <InfoMessage IconToShow={ChartColumnIncreasing} message={"Not enough data!"} iconSize={30}/>
        </div>
    )

    const setOptionLists = (startDate) => {
        const start = dayjs(startDate);
        const years = yearList(start.format("YYYY"))
        setIntervalList(prev => ({
            ...prev,
            years: [...["all time"], ...years]
        }))
    }

    const makeMonthList = (habitId) => {
        const allMonths = monthList();
        const habit = allHabits.find(habit => habit.habit_id===habitId)
        let months = ["all"];
        const created = {
            year: dayjs(habit.created_date).format("YYYY"),
            month: dayjs(habit.created_date).format("MMMM")
        };
        let start=0, end;
        if(interval.year === created.year && interval.year === dayjs().format("YYYY")){
            start = allMonths.indexOf(created.month)
            end = allMonths.indexOf(dayjs().format("MMMM"))+1
        }
        else if(interval.year === created.year) start = allMonths.indexOf(created.month)
        else if(interval.year === dayjs().format("YYYY")) end = allMonths.indexOf(dayjs().format("MMMM"))+1
        
        months = [
            ...months,
            ...allMonths.slice(start,end)
        ]

        return months
    }

    useEffect(() => {
        if(interval.year !== "all time"){
            // setInterval(prev => ({...prev, month: "all"}))
            
            const months = makeMonthList(habitId);

            setIntervalList(prev => ({
                ...prev,
                months: months
            }))

            if(!months.includes(interval.month)){
                setInterval(prev => ({...prev, month: "all"}))
        }
        }
        else{
            setIntervalList(prev => ({
                ...prev,
                months: ["all"]
            }))
            setInterval(prev => ({
                ...prev,
                month: 'all'
            }))
        }
    },[interval.year])

    useEffect(() => {
        if(intervalList.months.includes(interval.month)) console.log(interval)
    },[interval])

    const makeStackedChartData = data => {
        const chartData = 
        week.map((day,index) => ({
            name: day+"s",
            Completed: data.dayBreakUp.completedCount[index],
            Missed: data.dayBreakUp.missedCount[index]
        }));
        setStackedChartData(chartData);
    }

    useEffect(() => {
        if(allHabits.length > 0){
            // setHabitId(allHabits[0].habit_id)
            setHabitId(allHabits.at(-1).habit_id)
        }
    },[allHabits])

    useEffect(() => {
        if(loggedIn && habitId){
            fetchStats();
            const habit = allHabits.find(habit => habit.habit_id===habitId)
            setToShow(habitDisplay(habit));
            setOptionLists(habit.created_date)
        }
        
    },[loggedIn,habitId])

    useEffect(() => {
        if(stats) {
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
            makeStackedChartData(stats.result);
            setAreaChartData(stats.result.rolling);
        }
    },[stats])

    const habitDisplay = (habit) => `${habit.habit_title} ${habit.habit_emoji}` 

    return (
        <div className="flex flex-col w-full p-1 h-full gap-2">
            <div className="flex flex-row border z-999">            
                <div className="ml-auto mr-auto flex-1 border">
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
                <div className="w-7/100 flex border flex-center">
                    Over
                </div>
                <div className="flex w-fit border flex-center flex-row gap-2" style={{width: "35%"}}>
                    <div className="w-5/10 transition-all duration-300 border">
                        <Dropdown>
                            <Dropdown.Root toShow={interval.year}>
                                <Dropdown.List>
                                    {
                                        intervalList.years.map((opt, index) => (
                                            <Dropdown.Item key={index}
                                                            onclick={() => setInterval(prev => ({...prev,year:opt}))}>
                                                {opt}
                                            </Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.List>
                            </Dropdown.Root>
                        </Dropdown>
                    </div>
                    {
                        interval.year!=="all time" && 
                        <div className="w-5/10 transition-all duration-300 border">
                            <Dropdown>
                                <Dropdown.Root toShow={interval.month}>  
                                    <Dropdown.List>
                                        {
                                            intervalList.months.map((opt,index) => (
                                                <Dropdown.Item key={index}
                                                                onclick={() => setInterval(prev => ({...prev, month:opt}))}>
                                                    {opt}
                                                </Dropdown.Item>
                                            ))
                                        }
                                    </Dropdown.List>
                                </Dropdown.Root>
                            </Dropdown>
                        </div>
                    }
                </div>
            </div>
            {/* {isLoading && <Loader></Loader>} */}
            {error && 
                <div className="pt-10 text-xl">
                    <Error errorText="Could not load data" />
                </div>
            }
            {
                stats && 
                <>
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
                <div className="flex flex-row *:w-1/2 h-full gap-3">
                    <StatBox auto={false}>
                        {
                            stackedChartData.length > 0 ?
                            <SWIStackedBarChart dataArg={stackedChartData} xTick={{fontSize: 10}} 
                            xVal="name" y1Val="Completed" y2Val="Missed" yLabel="Number of days"/>
                            :
                            <NotEnoughData />
                        }
                    </StatBox>
                    <StatBox auto={false}>
                        {
                            areaChartData.length > 0 ?
                            <SWIAreaChart dataArg={areaChartData} xVal="date"
                            yVals={[
                                "cumulative",     
                                // "rollingOverAll", 
                                // "rollingOverExpected"
                            ]}  
                            yLabel="Completion Rate (%)" 
                            xTick={{
                                fontSize: 10,
                            }}
                            />
                            :
                            <NotEnoughData />
                        }
                    </StatBox>
                </div>
                </>

            }
        </div>
    )
}