import { readInput } from "../import-file";

/*

| is a vertical pipe connecting north and south.
- is a horizontal pipe connecting east and west.
L is a 90-degree bend connecting north and east.
J is a 90-degree bend connecting north and west.
7 is a 90-degree bend connecting south and west.
F is a 90-degree bend connecting south and east.
. is ground; there is no pipe in this tile.
S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.

..F7.
.FJ|.
SJ.L7
|F--J
LJ...s

*/

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
    const start = getStart(pipes)
    let nextCoordinate = getFirst(pipes, start)
    let previousDiff = {
        x: nextCoordinate.x - start.x,
        y: nextCoordinate.y - start.y
    }
    let currentPipe = pipes[nextCoordinate.y][nextCoordinate.x]
    let steps = 1
    while(currentPipe !== 'S'){
        console.log("Start Pipe:", currentPipe)
        const previousCoordinate = nextCoordinate
        nextCoordinate = getNext(pipes, nextCoordinate, previousDiff)
        previousDiff = {
            x: nextCoordinate.x - previousCoordinate.x,
            y: nextCoordinate.y - previousCoordinate.y
        }
        currentPipe = pipes[nextCoordinate.y][nextCoordinate.x]
        console.log("End Pipe:", currentPipe)
        steps++
    }
    console.log(steps/2)
}

function getStart(pipes: string[][]): Coordinates {
    for(let i = 0; i < pipes.length; i++){
        for(let j = 0; j < pipes[i].length; j++){
            if(pipes[j][i] === 'S') return {x: i, y: j}
        }
    }
}

function getFirst(pipes: string[][], coordinates: Coordinates): Coordinates {
    for(let i = 0; i < surroundings.length; i++){
        const nextCoordinate = surroundings[i]
        const nextX = coordinates.x + nextCoordinate.x
        const nextY = coordinates.y + nextCoordinate.y
        if(nextX < 0 || nextY < 0 || nextY >= pipes.length || nextX >= pipes[nextY].length) continue
        const nextPipe = pipes[nextY][nextX]
        const condition: Coordinates[] = pipesToCoordinatesMap[nextPipe]
        if(nextPipe === 'S' || isConnected(condition, nextCoordinate)) {
            return {x: nextX, y: nextY}
        }
    }
}

function getNext(pipes: string[][], coordinates: Coordinates, previousDiff: Coordinates): Coordinates {
    const currentPipe = pipes[coordinates.y][coordinates.x]
    const nextPipeDiff: Coordinates = pipesToCoordinatesMap[currentPipe].filter(condition => !compareCoordinates(condition, previousDiff))[0]
    console.log("previousDiff:", previousDiff)
    console.log("current possibilities:", pipesToCoordinatesMap[currentPipe])
    console.log("nextPipeDiff:", nextPipeDiff)
    const nextX = coordinates.x - nextPipeDiff.x
    const nextY = coordinates.y - nextPipeDiff.y
    return {x: nextX, y: nextY}
}

function isConnected(pipeConnections: Coordinates[], nextCoordinates: Coordinates): boolean {
    return pipeConnections.some(coordinate => compareCoordinates(coordinate, nextCoordinates))
}

function compareCoordinates(coordinateOne: Coordinates, coordinateTwo: Coordinates): boolean {
    return coordinateOne.x === coordinateTwo.x && coordinateOne.y === coordinateTwo.y
}

part1()