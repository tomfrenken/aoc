import { parse } from "path";
import { readInput } from "../import-file";

interface Player {
    unsortedHand: string[]
    hand: string[]
    bid: number
    handRank: number
}

const valueMap = new Map([
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
    ['6', 6],
    ['7', 7],
    ['8', 8],
    ['9', 9],
    ['T', 10],
    ['J', 11],
    ['Q', 12],
    ['K', 13],
    ['A', 14],
])

async function part1() {
    const input = await readInput(__dirname)
    const playerStrings = input.split('\n')
    const players = parsePlayers(playerStrings)

    players.sort(rankPlayers)

    const sum = players.reduce(
        (sum, player, rank) => sum += player.bid * (rank+1), 0
    )
    console.log(sum)
}

function parsePlayers(playerStrings: string[]): Player[] {
    return playerStrings.map(
        handString => {
            const [unsortedHand, bid] = handString.split(' ')
            const sortedHand = unsortedHand.split('').sort((a, b) => valueMap.get(b) - valueMap.get(a))
            const handRank = evalHand(sortedHand)
            return { 
                unsortedHand: unsortedHand.split(''),
                hand: sortedHand,
                handRank,
                bid: Number(bid)
            }
        }
    )
}

function rankPlayers(a: Player, b: Player): number {
    if(a.handRank !== b.handRank) return a.handRank - b.handRank
    for(let i = 0 ; i < a.hand.length; i++){
        const aCard = valueMap.get(a.unsortedHand[i])
        const bCard = valueMap.get(b.unsortedHand[i])
        if(aCard > bCard){
            return 1
        }
        if(aCard < bCard){
            return -1
        }
    }
    return 0
}

function evalHand(hand: string[]): number {
    if(five(hand)) return 7
    if(four(hand)) return 6
    if(fullhouse(hand)) return 5
    if(three(hand)) return 4
    if(two(hand)) return 3
    if(one(hand)) return 2
    return 1
}

function five(hand: string[]): boolean {
    return hand[0] === hand[4]
}

function four(hand: string[]): boolean {
    return hand[0] === hand[3] || hand[1] === hand[4]
}

function fullhouse(hand: string[]): boolean {
    return (hand[0] === hand[2] && hand[3] === hand[4])
    || (hand[0] === hand[1] && hand[2] === hand[4])
}

function three(hand: string[]): boolean {
    return hand[0] === hand[2]
    || hand[1] === hand[3]
    || hand[2] === hand[4]
}

function two(hand: string[]): boolean {
    return (hand[0] === hand[1] && hand[2] === hand[3]) 
    || (hand[0] === hand[1] && hand[3] === hand[4])
    || (hand[1] === hand[2] && hand[3] === hand[4])
}

function one(hand: string[]): boolean {
    return hand[0] === hand[1] 
    || hand[1] === hand[2]
    || hand[2] === hand[3]
    || hand[3] === hand[4]
}


part1()