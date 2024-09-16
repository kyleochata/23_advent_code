package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	file, err := os.Open("data.txt")
	if err != nil {
		fmt.Println("unable to open file:", err)
		return
	}
	defer file.Close()

	var sum int
	var buffer int
	scanner := bufio.NewScanner(file)
	for i := 0; scanner.Scan(); i++ {
		lines := scanner.Text()
		valid := true
		for j := 0; j < len(lines); j++ {
			if lines[j] >= '0' && lines[j] <= '9' {
				buffer *= 10
				buffer += int(lines[j] - '0')
				continue
			}
			if lines[j] == ' ' {
				continue
			}
			switch lines[j] {
			case 'r':
				if buffer > 12 {
					valid = false
					goto end
				}
			case 'g':
				if buffer > 13 {
					valid = false
					goto end
				}
			case 'b':
				if buffer > 14 {
					valid = false
					goto end
				}
			}
			buffer = 0
		}
		if valid {
			sum += i + 1
		}
	end:
	}
	fmt.Println("total sum of game number:", sum)
	results := CubePower()
	fmt.Println("Total Power:", results)
}
