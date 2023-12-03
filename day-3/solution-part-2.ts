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
                        // get number
                        // push number to array
                        // make changes to j if necessary
                    }
                }
            }
        }
    }
    return numbers
}

function isNumeric(symbol: string): boolean {
    return !isNaN(parseInt(symbol))
}

findEngineNumbers()