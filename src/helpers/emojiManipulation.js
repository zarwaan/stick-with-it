export function convertToDatabaseStorableString(emoji){
    const arr = Array.from(emoji).map(ch => ch.codePointAt(0))
    const databaseStringOfEmoji = JSON.stringify(arr)
    return databaseStringOfEmoji
}

export function convertToEmoji(codepoints){
    if(typeof codepoints === "string") codepoints = JSON.parse(codepoints)
    const emoji = String.fromCodePoint(...codepoints)
    return emoji
}