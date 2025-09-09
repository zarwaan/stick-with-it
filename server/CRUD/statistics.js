import dayjs from "dayjs";
import { monthList, week } from "../../src/helpers/calendar.js";
import { conn } from "../db/dbConn.js";
import { fetchUserHabits } from "./habitOperations.js";
import { title } from "motion/react-client";

class Response {
    constructor(success,message,result){
        this.success = success
        this.message = message
        this.result = result
    }
}

const getTimeInterval = (year,month,habitStart=null) => {
    let startDate, endDate
    if(year==="all time"){
        startDate = dayjs(habitStart || "-1")
        endDate = dayjs();   
    }
    else {
        if(month==="all"){
            startDate = dayjs(`${year}-01-01`);
            endDate = dayjs(`${year}-12-31`)
        }
        else{
            const monthNumber = monthList().indexOf(month) + 1;
            startDate = dayjs(`${year}-${monthNumber}-01`);
            endDate = startDate.add(1,'month').subtract(1,'day');
        }
    }

    return {startDate, endDate}
}

const isBetweenCreationAndToday = (createdDate,currentDate) => {
    const created = dayjs(createdDate);
    const today = dayjs();

    return (
        (currentDate.isAfter(created) || currentDate.isSame(created)) && 
        (currentDate.isBefore(today) || currentDate.isSame(today))
    )
}

const getExpectedDays = async (habitId,year,month) => {
    try{
        const [habit] = await conn.query(
            `select * from habits where habit_id = ?`,
            [habitId]
        )
        if(habit.length === 0) return null

        const createdDate = habit[0]['created_date']
        const {startDate, endDate} = getTimeInterval(year,month,createdDate);

        // const startDate = dayjs(habit[0]['created_date'] || "2025-08-01") 
        // const endDate = dayjs();

        const dtp = week.filter(day => habit[0][day.toLowerCase()]===1)
        const expected = [];
        let currentDate = endDate.clone();
        while((currentDate.isAfter(startDate) || currentDate.isSame(startDate))){
            if(isBetweenCreationAndToday(createdDate,currentDate)){
                if(dtp.includes(week[(currentDate.day() + 6)%7])){
                    expected.push(currentDate.format("YYYY-MM-DD"))
                }
            }
            currentDate = currentDate.subtract(1,'day')
        }

        return expected
    }
    catch(err){
        throw err
    }
}

const getMissedAndCompletedDays = async (habitId, expected, year, month) => {    
    try{
        const {startDate, endDate} = getTimeInterval(year,month);
        const [marked] = await conn.query(
            `select completed_date from habits_log where habit_id = ? and completed_date between ? and ?`,
            [habitId,startDate.format("YYYY-MM-DD"),endDate.format("YYYY-MM-DD")]
        )
        const missed = expected.filter(
            (date) => 
                !marked.some((markedDate) => dayjs(markedDate.completed_date).format("YYYY-MM-DD") === date)
        );

        const completed = marked.map(date => dayjs(date.completed_date).format("YYYY-MM-DD"))

        return {missed, completed};
    }
    catch(err){
        throw err
    }
}

const getStreaks = (expected,missed) => {
    try{
        let currentStreak=0, longestStreak = 0, breakCurrent = false, streak=0;
        expected.forEach((date) => {
            if(missed.includes(date)){
                if(!breakCurrent){
                    currentStreak = streak;
                    breakCurrent = true;
                }
                longestStreak = Math.max(streak,longestStreak)
                streak=0
            }
            else{
                streak++
            }
        })
        if(!breakCurrent) currentStreak = streak
        longestStreak = Math.max(streak,longestStreak)

        return {
            current: currentStreak, longest: longestStreak
        }
    }
    catch(err){
        throw err
    }
}

const getExpectedDaysNumber = (expected) => {
    return expected.length
}

const getMissedDaysNumber = (missed) => {
    return missed.length
}

const getCompletedDaysNumber = (completed) => {
    return completed.length
}

const getDayWiseBreakup = (completed, missed) => {
    const completedCount = Array(7).fill(0);
    const missedCount = Array(7).fill(0);
    completed.forEach(date => {
        completedCount[
            (dayjs(date).day()+6)%7
        ]++
    });
    missed.forEach(date => {
        missedCount[
            (dayjs(date).day()+6)%7
        ]++
    });
    return {completedCount, missedCount}
}

const getRollingRate = (exp, com) => {
    const expected = [...exp].reverse();
    const completed = [...com].reverse();

    // if(expected.length < 6) return [];
    const windowLength = expected.length > 14 ? 7 : 3;

    const cumulativeRate = [], rollingRateOverAll = [], rollingRateOverExpected = [];
    let num = 0, den = 0;

    const round = num => Math.round(num * 100)

    const getCumulative = (date) => {
        den++;
        if(completed.includes(date)){
            cumulativeRate.push({
                date,
                rate: round((++num)/den)
            })
        }
        else{
            cumulativeRate.push({
                date,
                rate: round(num/den)
            })
            
        }
        return round(num/den)
    }

    const getRollingOverAll = (date) => {
        // make start and end
        const current = dayjs(date);
        if(current.diff(dayjs(expected[0]),'days') < windowLength - 1) return 0;
        let windowAgo = current.subtract(windowLength-1, 'days')

        // make window
        const window = [];
        while(windowAgo.isBefore(current) || windowAgo.isSame(current)){
            window.push(windowAgo.format("YYYY-MM-DD"));
            windowAgo = windowAgo.add(1, 'day')
        }
        
        // get rate
        let num = 0, den = 0;
        window.forEach(date => {
            if(expected.includes(date)){
                den++;
            }
            if(completed.includes(date)){
                num++;
            }
        });

        if(den===0) return 0;
        rollingRateOverAll.push({date, rate:round(num/den)})
        return round(num/den)
    }

    const getRollingOverExpected = (date,index) => {
        if(index - windowLength + 1 < 0) return 0;
        const start = index - windowLength + 1;
        const end = index;
        const window = [];

        for(let i = start;i<=end;i++){
            window.push(expected[i])
        }

        let num = 0;
        window.forEach(date => {
            if(completed.includes(date)) num++;
        })

        rollingRateOverExpected.push({date, rate: round(num/windowLength)})
        return round(num/windowLength)
    }

    const final = [];
    expected.forEach((date,index) => {
        const rc = getCumulative(date);
        // const rroa = getRollingOverAll(date);
        // const rroe = getRollingOverExpected(date,index);
        const rroa = []; const rroe = [];
        final.push({
            date,
            cumulative: rc,
            rollingOverAll: rroa,
            rollingOverExpected: rroe
        });
    })
    
    return final
}

export async function getStats(habitId, fields, year, month){
    try{
        const expected = await getExpectedDays(habitId, year, month);
        if(!expected) return new Response(false, "Habit doesn't exist", null)
        const {missed, completed} = await getMissedAndCompletedDays(habitId,expected,year,month);
        
        const statConfig = {
            streak:  () => getStreaks(expected,missed),
            expected: () => getExpectedDaysNumber(expected),
            missed: () => getMissedDaysNumber(missed),
            completed: () => getCompletedDaysNumber(completed),
            dayBreakUp: () => getDayWiseBreakup(completed,missed),
            rolling: () => getRollingRate(expected,completed)
        }

        const result = {};
        
        if(fields)
            fields.map(field => {
                if(statConfig[field])
                    result[field] = statConfig[field]()
            })
        else
            Object.keys(statConfig).map(field => {
                result[field] = statConfig[field]()
            })

        return new Response(true, "Found", result)
    }
    catch(err){
        throw err
    }
}

export async function getAllStats(userId, fields=["streak","expected","missed","completed"]){
    const consistency = (stats) => {
        let most={id:0, rate:0}, least={id:0, rate:100};
        stats.forEach(stat => {
            const rate = stat.completed / stat.expected * 100
            if(rate>=most.rate){
                most = {
                    id: stat.id,
                    rate: rate
                }
            }
            if(rate<=least.rate){
                least = {
                    id: stat.id,
                    rate: rate
                }
            }
        })
        return {most, least}
    } 

    try{
        const allHabits = (await fetchUserHabits(userId)).result;
        const allStats = await Promise.all(
            allHabits.map(async habit => {
                const result = (await getStats(habit.habit_id, fields)).result
                return {
                    id: habit.habit_id,
                    title: habit.habit_title,
                    ...result
                }
            })
        )
        // console.dir(allStats,{depth: null})
        const {most, least} = consistency(allStats);
        console.log(most)
        console.log(least)
    }
    catch(err){
        console.error(err)
    }
}