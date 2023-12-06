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
    const maximumSpeed = Math.floor(time/2)
    console.log(`Min: ${minimumSpeed} Max: ${maximumSpeed}`)
    const possibleTimes = time % 2 ? (maximumSpeed-minimumSpeed)*2+2  : (maximumSpeed-minimumSpeed)*2 + 1
    let times = []
    for(let i = minimumSpeed; (time - i) >= minimumSpeed; i++){
        const remainingTime = time - i
        const speed = i
        const traveledDistance = remainingTime * speed
        if(traveledDistance > distance){
            times.push([i, traveledDistance])
        }
    }
    console.log("Current:",possibleTimes)
    console.log("Correct Times:", times.length)
    console.log("Correct:", times)
    return possibleTimes
}

function getMinimumSpeed(time: number, distance: number): number {
    const approximation = Math.floor(distance/time)
    for(let i = approximation; (time - i) >= approximation; i++){
        const remainingTime = time - i
        const speed = i
        const traveledDistance = remainingTime * speed
        if(traveledDistance > distance){
            return i
        }
    }
}

function newGetMinimumSpeed(time: number, distance: number, maxSpeed: number): number {
    // const graph = -(distance-maxSpeed) ** 2 + time
    // const constant = Math.ceil(distance/time)
    // const normalForm = x + constant
    // const form = -(x-maxSpeed) ** 2 + time + distance
    // const pqFormel = -(time) + Math.sqrt((time/2)**2 - maxSpeed)
    const a = distance - maxSpeed
    const b = time
    const c = distance/time
    const discriminant = b * b - 4 * a * c
    console.log(`a: ${a}, b: ${b}, c: ${c}`)
    console.log("Discrimant:", discriminant)
    console.log(Math.sqrt(discriminant))
    const intersect = (-b + Math.sqrt(discriminant)) / (2 * a)
    console.log(intersect)
    return intersect
}

part1()