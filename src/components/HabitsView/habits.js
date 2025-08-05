let id = 1;

class Habit {
    constructor(title, emoji) {
        this.title = title;
        this.emoji = emoji;
        this.id = id++;
    }
}

const ReadBook = new Habit("Read a book","📖")
const Exercise = new Habit("Exercise","💪")
const Brush = new Habit("Brush teeth","🪥")
const Bathe = new Habit("Take a bath","🛁")
const Study = new Habit("Study","🧠")
const Code = new Habit("Code", "💻")
const Meditate = new Habit("Meditate", "🧘‍♂️")
const Dance = new Habit("Dance", "💃")

export const todayHabits = [
    Brush, Bathe, Exercise
]

export const allHabits = [
    ReadBook, Exercise, Brush, Bathe, Study, Code, Meditate, Dance 
]