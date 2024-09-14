import { readFileSync } from 'fs'
import * as path from 'path'

const startMainTimer = Date.now()

// Read file synchronously
const filePath = path.join(__dirname, 'data.txt')
let lines: string[]

try {
  const fileContent = readFileSync(filePath, 'utf-8')
  lines = fileContent.split('\n')
} catch (err) {
  console.error('Error opening file:', err)
  process.exit(1)
}

const chunkSize = 10
const chunkedLines = splitFileIntoChunks(lines, chunkSize)

const findChunkSum = async (chunk: string[], id: number): Promise<number> => {
  console.log(`Processing chunk ${id}`)
  const timer = Date.now()
  let totalSum = 0

  for (const line of chunk) {
    const digitsInLine: string[] = []
    let currentLineSum = 0

    for (const char of line) {
      if (/\d/.test(char)) {
        digitsInLine.push(char)
      }
    }

    if (digitsInLine.length > 0) {
      currentLineSum = parseInt(
        digitsInLine[0] + digitsInLine[digitsInLine.length - 1],
        10
      )
    }

    totalSum += currentLineSum
  }

  console.log(`findChunk routine took ${Date.now() - timer}ms`)
  return totalSum
}

const processChunks = async () => {
  //Process chunk sums asynchronously
  const chunkPromises = chunkedLines.map((chunk, index) =>
    findChunkSum(chunk, index)
  )
  //wait for the sums to compile into chunkPromises
  const chunkSums = await Promise.all(chunkPromises)

  return chunkSums.reduce((acc, sum) => acc + sum, 0)
}

processChunks()
  .then((totalSum) => {
    console.log('Total Sum:', totalSum)
    console.log(
      'This entire operation took:',
      Date.now() - startMainTimer,
      'ms'
    )
  })
  .catch((err) => {
    console.error('Error processing chunks:', err)
  })

function splitFileIntoChunks(data: string[], numChunks: number): string[][] {
  const chunks: string[][] = []
  const chunkSize = Math.ceil(data.length / numChunks)

  for (let i = 0; i < data.length; i += chunkSize) {
    const end = Math.min(i + chunkSize, data.length)
    chunks.push(data.slice(i, end))
  }

  return chunks
}
