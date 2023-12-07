import { parse } from "path";
import { readInput } from "../import-file";

interface Player {
    unsortedHand: string
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
    ['J', 1],
    ['Q', 12],
    ['K', 13],
    ['A', 14],
])

async function part2() {
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
            const sortedHand = unsortedHand
                .split('')
                .sort((a, b) => valueMap.get(b) - valueMap.get(a))
                .join('')
            const jokers = getJokers(sortedHand)
            const handRank = evalHand(sortedHand, jokers)
            return { 
                unsortedHand,
                handRank,
                bid: Number(bid)
            }
        }
    )
}

function getJokers(sortedHand: string): number {
    const jokerMatches = (sortedHand.match(/J+/g) || [])
    const jokers = jokerMatches.length ? jokerMatches[0].length : 0
    return jokers
}

function rankPlayers(a: Player, b: Player): number {
    if(a.handRank !== b.handRank) return a.handRank - b.handRank
    for(let i = 0 ; i < a.unsortedHand.length; i++){
        const aCard = valueMap.get(a.unsortedHand.charAt(i))
        const bCard = valueMap.get(b.unsortedHand.charAt(i))
        if(aCard > bCard){
            return 1
        }
        if(aCard < bCard){
            return -1
        }
    }
    return 0
}

function evalHand(hand: string, jokers: number): number {
    const handSequences = hand
        .match(/(\w)\1*/g)
        .map(match => match.split(''))
        .sort((a, b) => b.length - a.length)
    const sequencesWithoutJokers = handSequences.filter(sequence => !sequence.includes("J"))
    const longestSequence = sequencesWithoutJokers.length ? sequencesWithoutJokers[0].length + jokers : jokers
    if(longestSequence === 5) return 7
    if(longestSequence === 4) return 6
    if(longestSequence === 3) {
        // fullhouse
        if(sequencesWithoutJokers[1]?.length === 2) {
            return 5
        }
        // threeSame
        return 4
    }
    if(longestSequence === 2){
        // twoPair
        if(sequencesWithoutJokers[1]?.length === 2){
            return 3
        }
        // onePair
        return 2
    }
    return 1
}


part2()