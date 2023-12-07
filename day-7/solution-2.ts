import { parse } from "path";
import { readInput } from "../import-file";
import { count } from "console";

interface Player {
    hand: string
    bid: number
    handRank: number
}

type CountObject = {
    [key: string]: number
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
            const [hand, bid] = handString.split(' ')
            const handRank = evalHand(hand)
            return { 
                hand,
                handRank,
                bid: Number(bid)
            }
        }
    )
}

function evalHand(hand: string): number {
    const countCards = hand.split('').reduce(
        (count, char) => {
            count[char] = (count[char] || 0) + 1
            return count
        }, ({} as CountObject))
    const jokers = countCards['J'] || 0
    delete countCards['J']
    const cardFrequencies = Object.values(countCards).sort((a, b) => b - a)
    const [long, secondLong = 1] = cardFrequencies
    const totalLong = long ? long + jokers : jokers
    switch(totalLong) {
        case 5: return 10
        case 4: return 9
        case 3: return totalLong + secondLong + 2
        case 2: return totalLong + secondLong
        default: return 0
    }
}

function rankPlayers(a: Player, b: Player): number {
    if(a.handRank !== b.handRank) return a.handRank - b.handRank
    for(let i = 0 ; i < a.hand.length; i++){
        const aCard = valueMap.get(a.hand.charAt(i))
        const bCard = valueMap.get(b.hand.charAt(i))
        if(aCard > bCard){
            return 1
        }
        if(aCard < bCard){
            return -1
        }
    }
    return 0
}


part2()