import { motion } from "motion/react";
import ProgressRing from "../utils/ProgressRing";
import StatBox from "./StatBox";
import useFetch from "../../hooks/useFetch";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useRef, useState, lazy } from "react";
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

// const SWIStackedBarChart = lazy(() => import('../utils/Charts/SWIStackedBarChart'))
// const SWIAreaChart = lazy(() => import('../utils/Charts/SWIAreaChart'))

export default function GraphView() {
    const {loggedIn} = useAuthContext();
    const {allHabits} = useHabitListContext();
    const {habitId, setHabitId} = useStatsContext();
    const [habit, setHabit] = useState(null);
    const [toShow, setToShow] = useState(null)
    const [stackedChartData, setStackedChartData] = useState([]);
    const [areaChartData, setAreaChartData] = useState([]);
    const [statsRowConfig, setStatsRowConfig] = useState([]);
    const [intervalConfig, setIntervalConfig] = useState({
        "all time": ["all"],
    });
    const [statInterval, setStatInterval] = useState({
        year: "all time",
        month: ""
    })
    const [intervalList, setIntervalList] = useState({
        years: ["all time"],
        months: ["all"]
    })
    const [triggerCount, setTriggerCount] = useState(0);

    const prevInterval = useRef("");
    const prevHabitId = useRef(0)
    
    const {data:stats, isLoading, error, fetchData:fetchStats} = useFetch(
        `/habit/${habitId}/stats?year=${encodeURIComponent(statInterval.year)}&month=${encodeURIComponent(statInterval.month)}`,
        {method: 'GET'},
        false
    );
    const NotEnoughData = () => (
        <div className="text-xl font-semibold mt-5">
            <InfoMessage IconToShow={ChartColumnIncreasing} message={"Not enough data!"} iconSize={30}/>
        </div>
    )
    const makeStackedChartData = data => {
        const chartData = 
        week.map((day,index) => ({
            name: day+"s",
            Completed: data.dayBreakUp.completedCount[index],
            Missed: data.dayBreakUp.missedCount[index]
        }));
        setStackedChartData(chartData);
    }
    const setOptionLists = (startDate) => {
        const start = dayjs(startDate);
        const years = yearList(start.format("YYYY"))
        const config = {};
        const allMonths = monthList();

        years.forEach(year => config[year] = makeMonthList(habit.created_date,allMonths,year))

        setIntervalConfig(prev => ({...prev, ...config}));
        setIntervalList(prev => ({
            ...prev,
            years: [...["all time"], ...years]
        }))
        setStatInterval({
            year: "all time",
            month: "all"
        });
    }
    const makeMonthList = (startDate,allMonths,yearArg) => {
        let months = ["all"];
        const created = {
            year: dayjs(startDate).format("YYYY"),
            month: dayjs(startDate).format("MMMM")
        };
        let start=0, end;
        if(yearArg === created.year && yearArg === dayjs().format("YYYY")){
            start = allMonths.indexOf(created.month)
            end = allMonths.indexOf(dayjs().format("MMMM"))+1
        }
        else if(yearArg === created.year) start = allMonths.indexOf(created.month)
        else if(yearArg === dayjs().format("YYYY")) end = allMonths.indexOf(dayjs().format("MMMM"))+1
        
        months = [
            ...months,
            ...allMonths.slice(start,end)
        ]

        return months
    }
    const triggerFetch = () => setTriggerCount(count => count + 1)
    const habitDisplay = (habit) => `${habit.habit_title} ${habit.habit_emoji}` 
    const isSecondOpen = () => statInterval.year === "all time"


    useEffect(() => {
        if(allHabits.length > 0){
            setHabitId(allHabits[0].habit_id)
        }
    },[allHabits])
    
    useEffect(() => {
        if(loggedIn && habitId){
            setHabit(allHabits.find(habit => habit.habit_id===habitId))
        }
    },[loggedIn,habitId])

    useEffect(() => {
        if(habit){
            setToShow(habitDisplay(habit));
            setOptionLists(habit.created_date);
            triggerFetch();
        }
    },[habit]);

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

    useEffect(() => {
        setIntervalList(prev => ({...prev, months: intervalConfig[statInterval.year]}))
    },[statInterval.year])

    useEffect(() => {
        let month = "all"
        if(intervalList.months.includes(statInterval.month)){
            month = statInterval.month
        }
        setStatInterval(prev => ({...prev, month: month}))
        if(habitId) triggerFetch();
    },[intervalList.months])

    useEffect(() => {
        if(JSON.stringify(statInterval) !== prevInterval.current || 
            prevHabitId.current !== habitId){
            prevInterval.current = JSON.stringify(statInterval);
            prevHabitId.current = habitId;
            // console.log(habitId)
            if(habitId) 
                fetchStats(); 
        }
    },[triggerCount])


    return (
        <div className="flex flex-col w-full p-1 h-full gap-2">
            <div className="flex flex-row z-999">            
                <div className="ml-auto mr-auto flex-1">
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
                <div className="w-7/100 flex flex-center">
                    over
                </div>
                <div className="flex flex-center flex-row gap-2" style={{
                    width: isSecondOpen() ? "20%" : "35%"
                }}>
                    <div className=""
                            style={{
                                width: isSecondOpen() ? "100%" : "50%"
                            }}>
                        <Dropdown>
                            <Dropdown.Root toShow={statInterval.year}>
                                <Dropdown.List>
                                    {
                                        intervalList.years.map((opt, index) => (
                                            <Dropdown.Item key={index}
                                                            onclick={() => setStatInterval(prev => ({...prev,year:opt}))}>
                                                {opt}
                                            </Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.List>
                            </Dropdown.Root>
                        </Dropdown>
                    </div>
                    {
                        statInterval.year!=="all time" && 
                        <div className="w-5/10 transition-all duration-300">
                            <Dropdown>
                                <Dropdown.Root toShow={statInterval.month}>  
                                    <Dropdown.List>
                                        {
                                            intervalList.months.map((opt,index) => (
                                                <Dropdown.Item key={index}
                                                                onclick={() => {
                                                                    setStatInterval(prev => ({...prev, month:opt}));
                                                                    triggerFetch();
                                                                    }}>
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