import { readInput } from "../import-file"

async function part1() {
    const input = (await readInput(__dirname)).split('\n')
    const times = input[0].match(/\d+/g).map(Number)
    const distances = input[1].match(/\d+/g).map(Number)
    let possibilitySum = 1
    for(let i = 0; i < times.length; i++) {
        const possibleTimes = getPossibleTimes(times[i], distances[i])
        possibilitySum *= possibleTimes
    }
    console.log(possibilitySum)
}

async function part2() {
    const input = (await readInput(__dirname)).split('\n')
    const time = Number(input[0].match(/\d+/g).join(''))
    const distance = Number(input[1].match(/\d+/g).join(''))
    const possibleTimes = getPossibleTimes(time, distance)
    console.log(possibleTimes)
}

function getPossibleTimes(time: number, distance: number): number {
    const minimumSpeed = getMinimumSpeed(time, distance)
    const maximumSpeed = Math.ceil(time/2)
    const possibleTimes = time % 2 ? (maximumSpeed-minimumSpeed)*2 : (maximumSpeed-minimumSpeed)*2 + 1
    return possibleTimes
}
function getMinimumSpeed(time: number, distance: number): number {
    const a = -1
    const b = time
    const c = -distance
    const discriminant = b * b - 4 * a * c
    const intersect = (-b + Math.sqrt(discriminant)) / (2 * a)
    return Math.ceil(intersect)
}

part2()