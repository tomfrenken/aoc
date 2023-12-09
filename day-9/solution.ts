import { readInput } from "../import-file";

async function part1() {
    const input = await readInput(__dirname)
    const sequences = input.split('\n').map(stringSequence => stringSequence.split(' ').map(Number))
    const sum = sequences.reduce((sum, sequence) => sum + predictNext(sequence) + sequence[sequence.length-1], 0)
    console.log("Part 1:", sum)
}

async function part2() {
    const input = await readInput(__dirname)
    const sequences = input.split('\n').map(stringSequence => stringSequence.split(' ').map(Number))
    const sum = sequences.reduce((sum, sequence) => sum + sequence[0] - predictPrevious(sequence), 0)
}

function predictNext(sequence: number[]): number {
    if(sequence.every(number => number === 0)) {
        return 0
    }
    const differences = []
    for(let i = 0; i < sequence.length-1; i++){
        differences.push(sequence[i+1] - sequence[i])
    }
    return differences[differences.length-1] + predictNext(differences)
}

function predictPrevious(sequence: number[]): number {
    if(sequence.every(number => number === 0)) {
        return 0
    }
    const differences = []
    for(let i = 0; i < sequence.length-1; i++){
        differences.push(sequence[i+1] - sequence[i])
    }
    return differences[0] - predictPrevious(differences)
}


// part1()
part2()