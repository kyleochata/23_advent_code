import { createReadStream } from 'fs'
import * as path from 'path'
import { Transform, TransformCallback } from 'stream'

const startMainTimer = Date.now()

const filePath = path.join(__dirname, 'data.txt')
const chunkSize = 10

// Stream to handle the processing of each chunk
const processStream = () => {
  return new Promise<number>((resolve, reject) => {
    let totalSum = 0
    let chunkBuffer: string[] = []
    //create a readStream (more efficient than readFileSync())
    const readStream = createReadStream(filePath, { encoding: 'utf-8' })

    //Transform stream to split data into chunks of lines
    const transformStream = new Transform({
      objectMode: true, //default: false (handling buffers / strings)
      transform(chunk: Buffer, encoding: string, callback: TransformCallback) {
        const lines = chunk.toString().split('\n')
        lines.forEach((line) => {
          chunkBuffer.push(line)
          if (chunkBuffer.length >= chunkSize) {
            this.push(chunkBuffer.splice(0, chunkSize))
          }
        })

        callback()
      },
    })

    const processChunk = async (chunk: string[]) => {
      const sum = await findChunkSum(chunk, 0) // id is not used here, but could be added
      totalSum += sum
    }

    readStream
      .pipe(transformStream)
      .on('data', (chunk: string[]) => {
        processChunk(chunk).catch(reject)
      })
      .on('end', () => {
        resolve(totalSum)
      })
      .on('error', reject)
  })
}

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

processStream()
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
