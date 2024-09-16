// package main

// import (
// 	"bufio"
// 	"fmt"
// 	"os"
// 	"strconv"
// 	"strings"
// )

// type GameData map[int][]map[string]int

// func main() {
// 	file, err := os.Open("./data.txt")
// 	if err != nil {
// 		return
// 	}
// 	defer file.Close()
// 	var sum int = 0

// 	scanner := bufio.NewScanner(file)
// 	for scanner.Scan() {
// 		var lines string = scanner.Text()
// 		gameNumber, gameData := ParseGameData(lines)
// 		for _, set := range gameData {
// 			for _, colorMap := range set {
// 				if colorMap["green"] > 12 {
// 					break
// 				}
// 			}
// 				break
// 			}
// 		}
// 	}
// }
// func ParseGameData(s string) (string, GameData) {
// 	// Split by the first ":" to separate the game number and the sets
// 	splitBySemicolon := strings.Split(s, ":")

// 	// Extract game number
// 	splitGameNumber := strings.Split(splitBySemicolon[0], " ")
// 	gameNumber := splitGameNumber[1]

// 	// Split the second part by ";" to get the sets
// 	setsSplit := strings.Split(splitBySemicolon[1], ";")
// 	gameData := make(GameData)

// 	// Loop over each set
// 	for i, set := range setsSplit {
// 		// Split each set by ",", which separates the color-value pairs
// 		splitForColors := strings.Split(set, ",")

// 		var setData []map[string]int
// 		for _, colorPair := range splitForColors {
// 			// Split by space to separate the value and color
// 			trimmedPair := strings.TrimSpace(colorPair)
// 			//fmt.Println("trimmedPair:", trimmedPair)
// 			splitPair := strings.Split(trimmedPair, " ")
// 			//fmt.Println("splitPair:", splitPair)
// 			if len(splitPair) != 2 {
// 				continue
// 			}

// 			value, err := strconv.Atoi(splitPair[0])
// 			if err != nil {
// 				fmt.Println("Error parsing number:", err)
// 				continue
// 			}

// 			color := splitPair[1]
// 			setData = append(setData, map[string]int{color: value})
// 		}

// 		// Store the set data in the gameData map with the set number as the key
// 		gameData[i] = setData
// 	}

//		return gameNumber, gameData
//	}
package main

import (
	"bufio"
	"fmt"
	"os"
)

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func CubePower() int {
	file, err := os.Open("data.txt")
	if err != nil {
		fmt.Println("error:", err)
		return -1
	}
	defer file.Close()

	var totalPower int
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		var bufferCount int
		var red_max, green_max, blue_max int = 0, 0, 0
		lines := scanner.Text()
		for j := 0; j < len(lines); j++ {
			if lines[j] >= '0' && lines[j] <= '9' {
				bufferCount *= 10
				bufferCount += int(lines[j] - '0')
				continue
			}
			if lines[j] == ' ' {
				continue
			}
			switch lines[j] {
			case 'r':
				red_max = max(red_max, bufferCount)
			case 'g':
				green_max = max(green_max, bufferCount)
			case 'b':
				blue_max = max(blue_max, bufferCount)
			}
			//reset buffer count after each saving the color_max
			bufferCount = 0
		}
		totalPower += red_max * green_max * blue_max
	}

	return totalPower
}
