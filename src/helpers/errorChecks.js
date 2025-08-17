import { convertToDatabaseStorableString } from "./emojiManipulation.js"
import graphemeSplitter from 'grapheme-splitter'
import emojiRegex from "emoji-regex";

const splitter = new graphemeSplitter();

export function checkIfEmpty(creds){
    // return fieldsArray.some(field => creds[field] === "")
    return Object.keys(creds).some(field => field!=="lastName" && creds[field] === "")
}

export function checkIfEmptyArrayForm(credsArray, creds){
    return credsArray.some(field => creds[field] === "")
}

export function checkMatch(creds){
    return creds.password === creds.rePassword
}

export function checkForBlanks(str){
    return str.includes(' ')
}

export function checkUsernameValidity(username){
    if(username.length < 3){
        return [false,'Username length must be more than 3 characters!']
    }
    if(username.length > 20){
        return [false, 'Username length must be less than 20 characters!']
    }
    if(!/[a-zA-Z]/.test(username)){
        return [false, 'Username must contain atleast one letter!']
    }
    if(!/^[a-zA-Z0-9_]+$/.test(username)){
        return [false, 'Username can contain only letters, numbers and underscores!']
    }
    return [true,'']
}

export function CheckNameValidity(name){
    if(name === "") return true;
    if(!/^[a-zA-Z]+[-']{0,1}[a-zA-Z]{1,}$/.test(name)){
        return false
    }
    return true
}

export function checkHabitNameValidity(name){
    if(name.length > 200){
        return [false, "Habit name must be less than 200 characters"]
    }
    if(name.length < 3){
        return [false, "Habit name must be more than 3 characters"]
    }
    if(!/[a-zA-Z]/.test(name)){
        return [false, "Habit name must contain atleast one letter"]
    }
    return [true,""]
}

export function checkIfEmoji(input){
    const s = input.trim();
    const re = emojiRegex();
    const matches = [...s.matchAll(re)];
    // exactly one emoji and it spans the whole string
    return matches.length === 1 && matches[0][0] === s;
}