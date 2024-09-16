package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

var wordToDigit = map[string]int{
	"zero":  0,
	"one":   1,
	"two":   2,
	"three": 3,
	"four":  4,
	"five":  5,
	"six":   6,
	"seven": 7,
	"eight": 8,
	"nine":  9,
}

func SumCalibrationValues() int {

	file, err := os.Open("./data.txt")
	if err != nil {
		return -1
	}
	defer file.Close()
	var sum int = 0

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		var lines string = scanner.Text()
		var firstDigit int
		var lastDigit int
		var firstSet bool

		for i := 0; i < len(lines); i++ {
			if lines[i] >= '0' && lines[i] <= '9' {
				var digit int = int(lines[i] - '0')

				if !firstSet {
					firstDigit = digit
					firstSet = true
				}
				lastDigit = digit
			} else {
				for word, dig := range wordToDigit {
					if checkWord(lines, i, word) {
						if !firstSet {
							firstDigit = dig
							firstSet = true
						}
						lastDigit = dig
						break
					}
				}
			}
		}
		sum += (firstDigit * 10) + lastDigit
	}

	return sum
}

func checkWord(line string, idx int, word string) bool {
	// basically we are scanning the hole like idx: mean till end of the line
	// and we are looking for the word
	return strings.HasPrefix(line[idx:], word)
}

func main() {
	result := SumCalibrationValues()
	fmt.Println("total sum:", result)
	return
}
