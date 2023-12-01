import { readInput } from "../import-file"

async function twoDigits(): Promise<void> {
    const input = await readInput(__dirname)
    const inputAsStringArray = input.split('\n')
    const sum = inputAsStringArray.reduce(
        (sum, curr) => sum + firstAndLast(curr),
        0
    )
    console.log(sum)
}

function firstAndLast(input: string): number {
    let first: string | null = null
    let last: string
    for(let i = 0; i<input.length; i++){
        if(!isNaN(parseFloat(input[i]))){
            last = input[i]
            if(!first) {
                first = input[i]
            }
            continue
        }
        const stringNumber = numberSubString(input, i)
        if(stringNumber){
            last = stringNumber
            if(!first) {
                first = stringNumber
            }
        }
    }
    return Number(first+last)
}

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

function numberSubString(input: string, inputIndex: number): string | null {
    for(let i = 0; i<numbersAsStrings.length; i++){
        const currentNumber = numbersAsStrings[i]
        let currentInputIndex = inputIndex
        for(let numberIndex = 0; numberIndex < currentNumber.length; numberIndex++){
            if(input.charAt(currentInputIndex) !== currentNumber.charAt(numberIndex)){
                break
            }
            if(currentNumber.length-1 === numberIndex){
                return (i+1).toString()
            }
            currentInputIndex++
        }
    }
    return null
}

twoDigits()