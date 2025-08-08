let id = 1;

class Habit {
    constructor(title, emoji, dayArray) {
        this.id = id++;
        this.title = title;
        this.emoji = emoji;
        this.dayArray = dayArray;
    }

    updateDays(days){
        this.dayArray = days;
    }

    clearHabit(arr){
        this.title = null;
        this.emoji = null;
        this.dayArray = null;
        const index = arr.findIndex(h => h.id === this.id)
        if(index>-1) arr.splice(index,1);
    }
}

// [Mon, Tue, Wed, Thurs, Fri, Sat, Sun]
const weekdays = [1,1,1,1,1,0,0]
const weekends = [0,0,0,0,0,1,1]
const everyday = new Array(7).fill(1);

const ReadBook = new Habit("Read a book","📖",weekends)
const Exercise = new Habit("Exercise","💪",weekdays)
const Brush = new Habit("Brush teeth","🪥",everyday)
const Bathe = new Habit("Take a bath","🛁",everyday)
const Study = new Habit("Study","🧠",weekdays)
const Code = new Habit("Code", "💻",[0,1,0,1,0,1,1])
const Meditate = new Habit("Meditate", "🧘‍♂️",weekends)
const Dance = new Habit("Dance", "💃",[0,0,1,0,0,1,1])

export const allHabits = [
    ReadBook, Exercise, Brush, Bathe, Study, Code, Meditate, Dance 
]