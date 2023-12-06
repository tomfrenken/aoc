import { readInput } from "../import-file";

async function getLocationNumber() {
    const input = await readInput(__dirname)
    const [seedsString, ...almanac] = input.split('\n\n')
    const seeds = seedsString.match(/\d+/g).map(Number)
    const seedMaps = getSeedMaps(almanac)
    const locationNumbers = mapSeedsToLocatioNumber(seeds, seedMaps)
    const smallestSeed =  Math.min(...locationNumbers)
    console.log(smallestSeed)
}

function getSeedMaps(almanac: string[]): number[][][] {
    const seedMaps = []
    for(let i = 0; i < almanac.length; i++){
        const numbersMapArray = []
        const segment = almanac[i].split('\n')
        for(let j = 1; j < segment.length; j++){
            const numbersMap = segment[j].match(/\d+/g).map(Number)
            numbersMapArray.push(numbersMap)
        }
        seedMaps.push(numbersMapArray)
    }
    return seedMaps
}

function mapSeedsToLocatioNumber(seeds: number[], seedMaps: number[][][]): number[] {
    let seedsStack = seeds
    for(let i = 0; i < seedMaps.length; i++){
        const targetSeeds = []
        const segment = seedMaps[i]
        for(let j = 0; j < segment.length; j++){
            const currentMap = segment[j]
            for(let k = 0; k < seedsStack.length; k++){
                const currentNumber = seedsStack[k]
                if(currentNumber !== null && inRange(currentNumber, currentMap)) {
                    targetSeeds.push(mapNumber(currentNumber, currentMap))
                    seedsStack[k] = null
                }
            }
        }
        seedsStack.map(number => number !== null && targetSeeds.push(number))
        seedsStack = targetSeeds
    }
    return seedsStack
}

function mapNumber(seed: number, seedMap: number[]): number{
    const [destinationRangeStart, sourceRangeStart, _] = seedMap
    const diff = sourceRangeStart - destinationRangeStart
    const newNumber = seed - diff
    return newNumber
}

function inRange(seed: number, seedMap: number[]): boolean {
    const [_, sourceRangeStart, rangeLength] = seedMap
    return seed >= sourceRangeStart && seed < (sourceRangeStart + rangeLength)
}

getLocationNumber()