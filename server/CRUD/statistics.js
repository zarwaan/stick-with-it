import dayjs from "dayjs";
import { week } from "../../src/helpers/calendar.js";
import { conn } from "../db/dbConn.js";

class Response {
    constructor(success,message,result){
        this.success = success
        this.message = message
        this.result = result
    }
}

const getExpectedDays = async (habitId) => {
    try{
        const [habit] = await conn.query(
            `select * from habits where habit_id = ?`,
            [habitId]
        )
        if(habit.length === 0) return null

        const startDate = dayjs(habit[0]['creation_date'] || "2025-06-01") 
        const dtp = week.filter(day => habit[0][day.toLowerCase()]===1)

        const today = dayjs();
        const expected = [];
        let currentDate = today.clone();
        while(currentDate.isAfter(startDate) || currentDate.isSame(startDate)){
            if(dtp.includes(week[(currentDate.day() + 6)%7])){
                expected.push(currentDate.format("YYYY-MM-DD"))
            }
            currentDate = currentDate.subtract(1,'day')
        }

        return expected
    }
    catch(err){
        throw err
    }
}

const getMissedDays = async (habitId, expected) => {
    try{   
        const [marked] = await conn.query(
            `select completed_date from habits_log where habit_id = ?`,
            [habitId]
        )
        const missed = expected.filter(
            (date) => 
                !marked.some((markedDate) => dayjs(markedDate.completed_date).format("YYYY-MM-DD") === date)
        );

        return missed;
    }
    catch(err){
        throw err
    }
}

const getStreaks= async (expected,missed) => {
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

const getExpectedDaysNumber = (expected,missed) => {
    return expected.length
}

const getMissedDaysNumber = (expected,missed) => {
    return missed.length
}

const getCompletedDaysNumber = (expected,missed) => {
    return expected.length - missed.length
}

export async function getStats(habitId, fields){
    const statConfig = {
        streak: getStreaks,
        expected: getExpectedDaysNumber,
        missed: getMissedDaysNumber,
        completed: getCompletedDaysNumber
    }

    try{
        const expected = await getExpectedDays(habitId);
        if(!expected) return new Response(false, "Habit doesn't exist", null)
        const missed = await getMissedDays(habitId,expected);
        
        const result = {};
        
        await Promise.all(fields.map(async field => {
            if(statConfig[field])
                result[field] = await statConfig[field](expected,missed)
        }))

        return new Response(true, "Found", result)
    }
    catch(err){
        throw err
    }
}