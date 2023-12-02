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
        (sum, game) => sum + validateGame(game, config),
        0
    )
    console.log(sum)
}

function validateGame(game: string, config: CubeColors): number {
    const gameId = getGameId(game)
    const rounds = getGameRounds(game)
    rounds.filter(
        round => {
            const roundCubes = parseCubeColors(round)
            return validateRound(roundCubes, config)
        }
    )
    return rounds.length ? 0 : gameId
}

// input Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

function getGameId(game: string): number {
    const gameIdSubString = game.split(':')[0]
    // check if I even need to trim
    console.log(gameIdSubString.split('Game')[1].replace(' ', 'X'))
    // trim if need to
    console.log(gameIdSubString.split('Game')[1].trim())
    return parseInt(gameIdSubString.split('Game')[1].trim())
}

function getGameRounds(game: string): string[] {
    return game.split(':')[1].split(';')
}

function parseCubeColors(round: string): CubeColors {
    // regex if blue then blue, red then red, green then green
    const cubes = round.split(',')
    const cubeColors = { red: 0, green: 0, blue: 0 }
    cubes.map(
        (cube) => {
            const numberAndColor = cube.split(' ')
            const number = numberAndColor[0]
            const color = numberAndColor[1]
            cubeColors[color] = number
        }
    )
    return cubeColors
}

function validateRound(roundCubes: CubeColors, config: CubeColors): boolean {
    return roundCubes.blue <= config.blue &&
        roundCubes.green <= config.green &&
        roundCubes.red <= config.red
}

const firstGameConfig = { red: 12, green: 13, blue: 14 }

cubeGame(firstGameConfig)