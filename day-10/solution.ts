import { readInput } from "../import-file";

type Coordinates = {
    x: number
    y: number
}

const pipesToCoordinatesMap = {
    '|': [
        { x: 0, y: -1 },
        { x: 0, y: 1 }
    ],
    '-': [
        { x: 1, y: 0 },
        { x: -1, y: 0 }
    ],
    'L': [
        { x: -1, y: 0 },
        { x: 0, y: 1 }
    ],
    'J': [
        { x: 1, y: 0 },
        { x: 0, y: 1 }
    ],
    '7': [
        { x: 1, y: 0 },
        { x: 0, y: -1 }
    ],
    'F': [
        { x: -1, y: 0 },
        { x: 0, y: -1 }
    ],
    '.': [
        { x: 0, y: 0 }
    ],
    'S': [
        { x: 0, y: 0 }
    ]
}

const surroundings = [
    // right
    {x: 1, y: 0}, 
    // left
    {x: -1, y: 0},
    // bottom
    {x: 0, y: 1},
    // up
    {x: 0, y: -1},
]


async function part1() {
    const input = await readInput(__dirname)
    const pipes = input.split('\n').map(segment => segment.split(''))
    const bounds = fillBounds(pipes)
    const start = getStart(pipes)
    const visitedMap = new Map<string, boolean>()

    visitedMap.set(`${start.x}-${start.y}`, true)
    bounds[start.y] = [start.x, start.x]
    let steps = 1

    let nextCoordinate = getFirst(pipes, start)
    bounds[nextCoordinate.y] = updateBounds(bounds[nextCoordinate.y], nextCoordinate)
    let previousDiff = {
        x: nextCoordinate.x - start.x,
        y: nextCoordinate.y - start.y
    }
    visitedMap.set(`${nextCoordinate.x}-${nextCoordinate.y}`, true)

    while(!sameCoordinates(nextCoordinate, start)){
        const previousCoordinate = nextCoordinate
        nextCoordinate = getNext(pipes, nextCoordinate, previousDiff)
        visitedMap.set(`${nextCoordinate.x}-${nextCoordinate.y}`, true)
        bounds[nextCoordinate.y] = updateBounds(bounds[nextCoordinate.y], nextCoordinate)
        previousDiff = {
            x: nextCoordinate.x - previousCoordinate.x,
            y: nextCoordinate.y - previousCoordinate.y
        }
        steps++
    }

    // part 1
    console.log("Steps:", steps/2)

    // part 2
    markTiles(pipes, bounds, visitedMap)
    //console.log(pipes.map(line => line.join('')).join('\n'))
    // loop over every element, if element === 0 then check environemnt && spread
    for(let i = 0; i < pipes.length; i++) {
        const [minX, maxX] = bounds[i]
        for(let j = minX; j <= maxX; j++) {
            if(!visitedMap.get(`${j}-${i}`)) {
                if(surroundingsContainInvalid({ x: j, y: i}, pipes)){
                    spreadInfection({ x:j, y: i}, pipes, visitedMap)
                }
            }
        }
    }

    const sum = pipes.reduce((sum, line) => sum + line.reduce((sum, char) => char === 'I' ? sum + 1 : sum, 0), 0)
    console.log("I's:", sum)
}

function fillBounds(pipes: string[][]): number[][] {
    return pipes.map(() => ([Infinity, -Infinity]))
}

function getStart(pipes: string[][]): Coordinates {
    for(let i = 0; i < pipes.length; i++){
        for(let j = 0; j < pipes[i].length; j++){
            if(pipes[i][j] === 'S') return {x: j, y: i}
        }
    }
}

function markTiles(pipes: string[][], bounds: number[][], visitedMap: Map<string, boolean>): void {
    for(let i = 0; i < pipes.length; i++) {
        const [minX, maxX] = bounds[i]
        for(let j = 0; j < pipes[i].length; j++) {
            if(j < minX || j > maxX) {
                pipes[i][j] = '0'
            } else if(!visitedMap.get(`${j}-${i}`)) {
                pipes[i][j] = 'I'
            }
        }
    }
}

function surroundingsContainInvalid(coordinates: Coordinates, pipes: string[][]): boolean {
    for(let i = coordinates.y - 1; i <= coordinates.y + 1; i++){
        if(i < pipes.length && i >= 0){
            for(let j = coordinates.x -1 ; j <= coordinates.x + 1; j++) {
                if(j < pipes[i].length && j >= 0){
                    if(pipes[i][j] === '0') return true
                }
            }
        }
    }
    return false
}

function spreadInfection(coordinates: Coordinates): void {
    // check for slip through pipes
    // if surroundings contain I then change I to 0 and spreadInfection

}

function updateBounds(xRange: number[], nextCoordinates: Coordinates): number[] {
    let [minX, maxX] = xRange
    minX = Math.min(minX, nextCoordinates.x)
    maxX = Math.max(maxX, nextCoordinates.x)
    return [minX, maxX]
}

function getFirst(pipes: string[][], coordinates: Coordinates): Coordinates {
    for(let i = 0; i < surroundings.length; i++){
        const nextCoordinates = surroundings[i]
        const nextX = coordinates.x + nextCoordinates.x
        const nextY = coordinates.y + nextCoordinates.y
        if(nextX < 0 || nextY < 0 || nextY >= pipes.length || nextX >= pipes[nextY].length) continue
        const nextPipe = pipes[nextY][nextX]
        const condition: Coordinates[] = pipesToCoordinatesMap[nextPipe]
        if(isConnected(condition, nextCoordinates)) {
            return {x: nextX, y: nextY}
        }
    }
}

function getNext(pipes: string[][], coordinates: Coordinates, previousDiff: Coordinates): Coordinates {
    const currentPipe = pipes[coordinates.y][coordinates.x]
    const nextPipeDiff: Coordinates = pipesToCoordinatesMap[currentPipe].filter(condition => !sameCoordinates(condition, previousDiff))[0]
    const nextX = coordinates.x - nextPipeDiff.x
    const nextY = coordinates.y - nextPipeDiff.y
    return {x: nextX, y: nextY}
}

function isConnected(pipeConnections: Coordinates[], nextCoordinates: Coordinates): boolean {
    return pipeConnections.some(coordinate => sameCoordinates(coordinate, nextCoordinates))
}

function sameCoordinates(coordinateOne: Coordinates, coordinateTwo: Coordinates): boolean {
    return coordinateOne.x === coordinateTwo.x && coordinateOne.y === coordinateTwo.y
}

part1()