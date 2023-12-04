import { readInput } from "../import-file";

type Card = {
    id: number,
    winningNumbers: number[]
    chosenNumbers: number[]
}

async function part1() {
    const input = await readInput(__dirname)
    const cards = input.split('\n')
    const sum = cards.reduce((sum, card) => sum + getCardValue(card), 0)
    console.log(sum)
}

async function part2() {
    const input = await readInput(__dirname)
    const cards = input.split('\n')
    const sum = getAllCards(cards)
    console.log(sum)
}

function getCardValue(card: string): number {
    const parsedCard = parseCard(card)
    const matchingNumbers = getMatchingNumbers(parsedCard)
    return matchingNumbers.length ? 2 ** (matchingNumbers.length-1) : 0
}

function getAllCards(cards: string[]): number {
    let result = 0
    const parsedCards = cards.map(parseCard)
    const stack = [...parsedCards]
    while(stack.length){
        const currentCard = stack.pop()
        result++

        const matches = getMatchingNumbers(currentCard)
        const maxCardIndex = currentCard.id - 1 + matches.length
        for(let i = currentCard.id; i <= maxCardIndex && i < parsedCards.length; i++) {
            stack.push(parsedCards[i])
        }
    }
    return result
}

function parseCard(card: string): Card {
    const [leftSide, rightSide] = card.split('|')
    const [title, leftSideNumbers] = leftSide.split(':')
    const id = Number(title.match(/\d+/g)[0])
    const winningNumbers = leftSideNumbers.match(/\d+/g).map(Number)
    const chosenNumbers = rightSide.match(/\d+/g).map(Number)
    return {
        id,
        winningNumbers,
        chosenNumbers
    }
}

function getMatchingNumbers(card: Card): number[]{
    return match(card.winningNumbers, card.chosenNumbers)
}

function match(winningNumbers: number[], chosenNumbers: number[]): number[] {
   return winningNumbers.filter(num => chosenNumbers.includes(num))
}

part2()