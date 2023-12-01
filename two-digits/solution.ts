import { readInput } from "../import-file"

const numbersAsStrings = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
]

async function twoDigits(): Promise<void> {
    const input = await readInput(__dirname)
    const inputAsStringArray = input.split('\n')
    const sum = inputAsStringArray.reduce(
        (sum, curr) => sum + firstAndLast(curr),
        0
    )
}

function firstAndLast(input: string): number {
    const first = leftSearch(input)
    const last = rightSearch(input)
    return Number(first+last)
}

function leftSearch(input: string): string {
    for(let slowPointer = 0; slowPointer<input.length; slowPointer++){
        const searchResult = search(input, slowPointer)
        if(searchResult) return searchResult
    }
}

function rightSearch(input: string): string {
    for(let slowPointer = input.length-1; slowPointer >= 0; slowPointer--){
        const searchResult = search(input, slowPointer)
        if(searchResult) return searchResult
    }
}

function search(input: string, slowPointer: number): string | null {
    const parseChar = parseInt(input.charAt(slowPointer))
    if(parseChar) return parseChar.toString()
    return searchWord(input, slowPointer)
}

function searchWord(input: string, inputIndex: number): string | null {
    for(let index = 0; index < numbersAsStrings.length; index++){
        let currentInputIndex = inputIndex
        const numberString = numbersAsStrings[index]
        if(inputIndex + numberString.length <= input.length) {
            for(let numberIndex = 0; numberIndex < numberString.length; numberIndex++) {
                if(input.charAt(currentInputIndex) !== numberString.charAt(numberIndex)) {
                    break
                }
                if(numberString.length-1 === numberIndex) {
                    return (index+1).toString()
                }
                currentInputIndex++
            }
        }
    }
    return null
}

twoDigits()