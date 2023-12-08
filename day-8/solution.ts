import { GeneratedIdentifierFlags } from "typescript";
import { readInput } from "../import-file";
import { start } from "repl";

type Branches = {
    L: string
    R: string
}

type Tree = Record<string, Branches>

async function part1() {
    const input = await readInput(__dirname)
    const [instructions, map] = input.split('\n\n')
    const tree = parseTree(map)
    const steps = traverseTree(tree, instructions, 'AAA')
    console.log(steps)
}

async function part2() {
    const input = await readInput(__dirname)
    const [instructions, map] = input.split('\n\n')
    const tree = parseTree(map)
    const startNodes = Object.keys(tree).filter(node => node.endsWith('A'))
    const cycleLengths = startNodes.map(node => traverseTree(tree, instructions, node))
    const lcm = findLCM(cycleLengths)
    console.log(lcm)
}

function parseTree(map: string): Tree {
    return map.split('\n').reduce(
        (tree, node) => {
            const [root, branches] = node.split(' = ')
            const [L, R] = branches.match(/[A-Z]{3}/g)
            tree[root] = { L, R }
            return tree
        }, {} as Tree
    )
}

function traverseTree(tree: Tree, instructions: string, node: string): number {
    let currNode = node
    let count = 0
    let instructionIndex = 0
    while(!currNode.endsWith('Z')) {
        const instruction = instructions.charAt(instructionIndex)
        currNode = tree[currNode][instruction]
        
        count++
        instructionIndex++
        if(instructionIndex === instructions.length) {
            instructionIndex = 0
        }
    }
    return count
}

function findLCM(numbers: number[]): number {
    return numbers.reduce((lcm, numbers) => findLCMofTwoNumbers(lcm, numbers))
}

function findLCMofTwoNumbers(a: number, b: number): number {
    return (a * b) / findGCD(a, b);
}

function findGCD(a: number, b: number): number {
    return b === 0 ? a : findGCD(b, a % b);
}


part2()