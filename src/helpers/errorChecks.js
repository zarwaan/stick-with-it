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