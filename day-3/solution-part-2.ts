import { readInput } from "../import-file";

async function findEngineNumbers() {
    const input = await readInput(__dirname)
    const engineSchematics = input.split('\n')
    let sum = 0
    for(let i = 0; i < engineSchematics.length; i++){
        for(let j = 0; j < engineSchematics[i].length; j++){
            let currNumber = ''
            let currSymbol = engineSchematics[i].charAt(j)
            let adjacentSymbol = false
            while(isNumeric(currSymbol)){
                currNumber += currSymbol
                if(!adjacentSymbol && checkSurroundingsForSymbols(engineSchematics, i, j)){
                    adjacentSymbol = true
                }
                j++
                currSymbol = engineSchematics[i].charAt(j)
            }
            if(currNumber && adjacentSymbol){
                sum += Number(currNumber)
            } else if (currNumber) {
            }
        }
    }
    console.log(sum)
}

function checkSurroundingsForSymbols(engineSchematics: string[], lineIndex: number, charIndex: number): boolean{
    for(let i = lineIndex-1; i <= lineIndex + 1; i++){
        if(i >= 0 && i < engineSchematics.length){
            for(let j = charIndex-1; j <= charIndex + 1; j++){
                if(j >= 0 && j < engineSchematics[i].length){
                    const currSymbol = engineSchematics[i].charAt(j)
                    if(currSymbol !== '.' && !isNumeric(currSymbol)) {
                        return true
                    }
                }
            }
        }
    }
    return false
}

function isNumeric(symbol: string): boolean {
    return !isNaN(parseInt(symbol))
}

findEngineNumbers()