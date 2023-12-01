import { readFile } from 'node:fs/promises';
import path from 'path';

export async function readInput(filePath: string) {
    const inputFilePath = path.join(filePath, 'input')
    return readFile(inputFilePath, 'utf-8')
}