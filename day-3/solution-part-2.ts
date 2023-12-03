import { readInput } from "../import-file";

async function findEngineNumbers() {
    const input = await readInput(__dirname)
    const engineSchematics = input.split('\n')
    let sum = 0
    for(let i = 0; i < engineSchematics.length; i++){
        for(let j = 0; j < engineSchematics[i].length; j++){
            const currSymbol = engineSchematics[i].charAt(j)
            if(currSymbol === '*'){
                const surroundingNumbers = getSurroundingNumbers(engineSchematics, i, j)
                if(surroundingNumbers.length === 2){
                    sum += surroundingNumbers[0] * surroundingNumbers[1]
                }
            }
        }
    }
    console.log(sum)
}

function getSurroundingNumbers(engineSchematics: string[], lineIndex: number, charIndex: number): number[] {
    const numbers = []
    for(let i = lineIndex-1; i <= lineIndex + 1; i++){
        if(i >= 0 && i < engineSchematics.length){
            for(let j = charIndex-1; j <= charIndex + 1; j++){
                if(j >= 0 && j < engineSchematics[i].length){
                    const currSymbol = engineSchematics[i].charAt(j)
                    if(isNumeric(currSymbol)){
                        const newNumber = getNumber(engineSchematics[i], j)
                        numbers.push(newNumber)
                        if(isNumeric(engineSchematics[i].charAt(j+1))) {
                            break
                        }
                    }
                }
            }
        }
    }
    return numbers
}

function getNumber(line: string, startIndex: number): number {
    const middleSubString = line.charAt(startIndex)
    const leftSubString = getLeftSubString(line, startIndex - 1)
    const rightSubString = getRightSubString(line, startIndex + 1)
    const number = leftSubString.concat(middleSubString).concat(rightSubString)
    return Number(number)
}

function getLeftSubString(line: string, startIndex: number): string {
    let subString = ''
    let currentIndex = startIndex
    let currentSymbol = line.charAt(startIndex)
    while(isNumeric(currentSymbol)){
        subString = currentSymbol.concat(subString)
        currentIndex--
        currentSymbol = line.charAt(currentIndex)
    }
    return subString
}

function getRightSubString(line: string, startIndex: number): string {
    let subString = ''
    let currentIndex = startIndex
    let currentSymbol = line.charAt(startIndex)
    while(isNumeric(currentSymbol)){
        subString = subString.concat(currentSymbol)
        currentIndex++
        currentSymbol = line.charAt(currentIndex)
    }
    return subString
}

function isNumeric(symbol: string): boolean {
    return !isNaN(parseInt(symbol))
}

findEngineNumbers()