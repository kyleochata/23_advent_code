/*
* need to read data.txt. Extract data line by line.
	= pos split data up and pass through go routines
	= need to read each line. Find the first number and last number and add.
	= sum all line sums for each chunk
	= return total sum

	naive:
	per line that's fed in. read all characters and extract number to a slice. Then take slice[0] + slice[len(slice) -1]
*/

package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"strconv"
	"sync"
	"time"
	"unicode"
)

func main() {
	startMainTimer := time.Now()
	//open file and read lines
	file, err := os.Open("./data.txt")
	if err != nil {
		fmt.Println("error opening file:", err)
		return
	}
	defer file.Close()
	var lines []string

	scanner := bufio.NewScanner(file)
	//scan file and separate data by line

	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	// for _, line := range lines {
	// 	fmt.Println(line)
	// }
	if err := scanner.Err(); err != nil {
		fmt.Println("Error reading file:", err)
		return
	}
	ch := make(chan int)
	wg := sync.WaitGroup{}
	var totalSum int
	chunkSize := 10
	chunkedLines := splitFileIntoChunks(lines, chunkSize)

	for i, chunk := range chunkedLines {
		wg.Add(1)
		go findChunkSum(chunk, ch, &wg, i)
	}
	//wait for all goroutines to finish
	go func() {
		wg.Wait()
		close(ch)
	}()
	for j := 0; j < chunkSize; j++ {
		totalSum += <-ch
	}
	//add non goroutine solution here

	fmt.Println("totalSum:", totalSum)
	fmt.Println("This entire operation took:", time.Since(startMainTimer))

	return
}

func findChunkSum(lines []string, ch chan<- int, wg *sync.WaitGroup, id int) {
	defer wg.Done()
	fmt.Printf("processing chunk %v \n", id)
	timer := time.Now()
	var totalSum int
	for _, line := range lines {
		var digitsInLine []string
		currentLineSum := 0
		for _, char := range line {
			if unicode.IsDigit(char) {
				digitsInLine = append(digitsInLine, string(char))
			}
		}
		currentLineSum, _ = strconv.Atoi(digitsInLine[0] + digitsInLine[len(digitsInLine)-1])
		totalSum += currentLineSum
	}
	fmt.Println("Goroutine took %v\n", time.Since(timer))
	ch <- totalSum
}
func splitFileIntoChunks(data []string, numChunks int) [][]string {
	var chunks [][]string
	chunkSize := int(math.Ceil(float64(len(data)) / float64(numChunks)))
	for i := 0; i < len(data); i += chunkSize {
		end := i + chunkSize
		if end > len(data) {
			end = len(data)
		}
		chunks = append(chunks, data[i:end])
	}
	return chunks
}

//non goroutine solution
// for _, line := range lines {
// 	var digitsInLine []rune
// 	var sumForLine int
// 	for _, char := range line {
// 		if unicode.IsDigit(char) {
// 			digitsInLine = append(digitsInLine, char)
// 		}
// 	}
// 	//add first and last digits found in line for local sum
// 	//string(dL[0] + dl[len(dl) -1]) --->> yields 0 for everything
// 	strSum := string(digitsInLine[0]) + string(digitsInLine[len(digitsInLine)-1])
// 	sumForLine, _ = strconv.Atoi(strSum)
// 	totalSum += sumForLine
// }
