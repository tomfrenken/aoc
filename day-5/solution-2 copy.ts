import { readInput } from "../import-file";

type SeedRange = {
    start: number,
    length: number
}

type SeedMap = {
    destRangeStart: number
    srcRangeStart: number
    rangeLength: number
}

async function getLocationNumber() {
    const input = await readInput(__dirname)
    const [seedsString, ...almanac] = input.split('\n\n')
    const seedRanges = parseSeedRanges(seedsString)
    const seedMaps = getSeedMaps(almanac)
    const smallestLocationNumber = filterSeedRanges(seedRanges, seedMaps)
    console.log(smallestLocationNumber)
}

function parseSeedRanges(seedsString: string): SeedRange[] {
    const seedRanges = []
    const seedRangesArray = seedsString.match(/\d+/g).map(Number)
    for(let i = 0; i < seedRangesArray.length; i += 2){
        const start = seedRanges[i]
        const length = seedRanges[i+1]
        seedRanges.push({ start, length })
    }
    return seedRanges
}

function getSeedMaps(almanac: string[]): SeedMap[][] {
    const seedMaps = []
    for(let i = 0; i < almanac.length; i++){
        const seedMapArray = []
        const segment = almanac[i].split('\n')
        for(let j = 1; j < segment.length; j++){
            const numbersMap = segment[j].match(/\d+/g).map(Number)
            seedMapArray.push(parseSeedMap(numbersMap))
        }
        seedMaps.push(seedMapArray)
    }
    return seedMaps
}

function parseSeedMap(seedMap: number[]): SeedMap {
    const [destRangeStart, srcRangeStart, rangeLength] = seedMap
    return {
        destRangeStart,
        srcRangeStart,
        rangeLength
    }
}

function filterSeedRanges(seedRanges: SeedRange[], seedMaps: SeedMap[][]): number {
    let filteredSeedRanges = [...seedRanges]
    for(let i = 0; i < seedMaps.length; i++){
        const segment = seedMaps[i]
        const temporarySeedRanges = []
        for(let j = 0; j < segment.length; j++){
            const currentMap = segment[j]
            for(let k = 0; k < filteredSeedRanges.length; k++) {
                const { start, length } = filteredSeedRanges[k]
                if(true){
                    
                }
            }
        }
        filteredSeedRanges = temporarySeedRanges
    }
    return filteredSeedRanges.sort((a, b) => a.start - b.start)[0].start
}

function mapSeedToLocatioNumber(seed: number, seedMaps: SeedMap[][]): number {
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

function mapSeed(seed: number, seedMap: SeedMap): number{
    const { destRangeStart, srcRangeStart }  = seedMap
    const diff = srcRangeStart - destRangeStart
    return seed - diff
}

function inRange(seed: number, seedMap: SeedMap): boolean {
    const { srcRangeStart, rangeLength } = seedMap
    return seed >= srcRangeStart && seed < (srcRangeStart + rangeLength)
}

getLocationNumber()