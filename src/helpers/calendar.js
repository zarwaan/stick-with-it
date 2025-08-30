import dayjs from "dayjs"

export const week = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

export const weekAbbr = week.map((day) => day.slice(0,3))

export const weekSingleLetter = week.map((day) => day.slice(0,1))

export function today() {
    return {
        year: dayjs().format('YYYY'),
        month: dayjs().format('M'),
        monthName: dayjs().format('MMM'),
        date: dayjs().format('D'),
        day: dayjs().format('dddd')
    }
}

export function getOrdinalSuffix(num){
    if(num===1 || (num!==11 && num%10===1)) return 'st'
    if(num===2 || (num!==12 && num%10===2)) return 'nd'
    if(num===3 || (num!==13 && num%10===3)) return 'rd'
    return 'th'
}