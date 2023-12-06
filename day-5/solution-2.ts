import { readInput } from "../import-file";

async function getLocationNumber() {
    const input = await readInput(__dirname)
    const [seedsString, ...almanac] = input.split('\n\n')
    const seedRanges = seedsString.match(/\d+/g).map(Number)
    const seedMaps = getSeedMaps(almanac)
    let smallestLocationNumber = Number.MAX_SAFE_INTEGER
    for(let i = 0; i < seedRanges.length; i += 2){
        const start = seedRanges[i]
        const range = seedRanges[i+1]
        for(let seed = start; seed < (start + range); seed++) {
            const localionNumber = mapSeedToLocatioNumber(seed, seedMaps)
            console.log(localionNumber)
            smallestLocationNumber = Math.min(smallestLocationNumber, localionNumber)
        }
    }
    console.log(smallestLocationNumber)
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

function mapSeedToLocatioNumber(seed: number, seedMaps: number[][][]): number {
    for(let i = 0; i < seedMaps.length; i++){
        const segment = seedMaps[i]
        for(let j = 0; j < segment.length; j++){
            const currentMap = segment[j]
            if(inRange(seed, currentMap)) {
                seed = mapSeed(seed, currentMap)
                break
            }
        }
    }
    return seed
}

function mapSeed(seed: number, seedMap: number[]): number{
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