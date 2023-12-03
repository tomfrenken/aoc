import { readInput } from "../import-file";

type CubeColors = {
    red: number
    green: number
    blue: number
}

async function cubeGame(config: CubeColors): Promise<void> {
    const games = await readInput(__dirname)
    const gamesAsStringArray = games.split('\n')
    const sum = gamesAsStringArray.reduce(
        (sum, game) => sum + power(game, config),
        0
    )
    console.log(sum)
}

function validateGame(game: string, config: CubeColors): number {
    const gameId = getGameId(game)
    const rounds = getGameRounds(game)
    const roundsAreValid = rounds.every(
        round => {
            const roundCubes = parseCubeColors(round)
            return validateRound(roundCubes, config)
        }
    )
    return roundsAreValid ? gameId : 0
}

function power(game: string, config: CubeColors): number {
    const rounds = getGameRounds(game)
    const maxCubeColors = { red: 0, green: 0, blue: 0 }
    rounds.map(
        round => {
            const roundCubes = parseCubeColors(round)
            maxCubeColors.red = Math.max(maxCubeColors.red, roundCubes.red)
            maxCubeColors.green = Math.max(maxCubeColors.green, roundCubes.green)
            maxCubeColors.blue = Math.max(maxCubeColors.blue, roundCubes.blue)
        }
    )
    return meeeeehrENEEEEERGIEEEE(maxCubeColors)
}

function getGameId(game: string): number {
    const gameIdSubString = game.split(':')[0]
    return parseInt(gameIdSubString.split('Game')[1])
}

function getGameRounds(game: string): string[] {
    return game.split(':')[1].split(';')
}

function parseCubeColors(round: string): CubeColors {
    const cubes = round.split(',')
    const trimmedCubes = cubes.map(cube => cube.trim())
    const cubeColors = { red: 0, green: 0, blue: 0 }
    trimmedCubes.map(
        (cube) => {
            const [number, color] = cube.split(' ')
            cubeColors[color] = Number(number)
        }
    )
    return cubeColors
}

function validateRound(roundCubes: CubeColors, config: CubeColors): boolean {
    return roundCubes.blue <= config.blue &&
        roundCubes.green <= config.green &&
        roundCubes.red <= config.red
}

// https://www.youtube.com/watch?v=91gG8VQo2TI
function meeeeehrENEEEEERGIEEEE(cubeColors: CubeColors) {
    return cubeColors.blue * cubeColors.red * cubeColors.green
}

const firstGameConfig = { red: 12, green: 13, blue: 14 }

cubeGame(firstGameConfig)