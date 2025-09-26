import dayjs from "dayjs"

export const week = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

export const weekFromSunday = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
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

export function monthList(length = "MMMM"){
    let mon = dayjs().startOf('year')
    const months = [];
    for(let i = 1; i<=12; i++){
        months.push(mon.format(length))
        mon = mon.add(1,'month')
    }
    return months;
}

export function yearList(from){
    let y = dayjs(`${from}-01-01`);
    const years = [];
    while(y.format("YYYY")!==dayjs().format("YYYY")){
        years.push(y.format("YYYY"))
        y = y.add(1,'year')
    }
    years.push(dayjs().format("YYYY"))
    return years;
}

export function firstDayOfMonth(month,year){
    return dayjs(`${year}-${month}-01`).day();
}

export function daysInMonth(month, year){
    return dayjs(`${year}-${month}-01`).daysInMonth();
}

export function getDaysOfMonthWithNulls(month, year){
    const daysToLeave = firstDayOfMonth(month,year);
    const numberOfDays = daysInMonth(month, year);

    const nullArrayBegin = Array.from({length: daysToLeave}).fill(null);
    const daysWithoutNull = Array.from({length: numberOfDays},(_,i) => i+1)
    const nullArrayEnd = Array.from({length: 42 - daysToLeave - numberOfDays}).fill(null)
    
    return [...nullArrayBegin, ...daysWithoutNull, ...nullArrayEnd]
}