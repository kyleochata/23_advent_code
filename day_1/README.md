# Trebuchet Calibration Puzzle - Advent of Code (Day 1)

## Problem Summary

You've been tasked with solving an issue related to snow production, and as part of the solution, you need to recover calibration values from a document that has been altered by an overzealous Elf. The document contains lines of text, each line originally holding a specific calibration value. However, the document has been amended with additional characters, making it difficult to extract the values.

Your job is to determine the sum of these calibration values by combining the first digit and the last digit from each line to form a two-digit number.

### Example Input:

```text
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
```

Example Output:
For the above lines, the calibration values are:

1abc2 -> Combine the first and last digits: 12
pqr3stu8vwx -> Combine the first and last digits: 38
a1b2c3d4e5f -> Combine the first and last digits: 15
treb7uchet -> Combine the first and last digits: 77
The sum of these calibration values is:

Copy code
12 + 38 + 15 + 77 = 142
Task:
Given an entire calibration document (your input), calculate the sum of all calibration values by:

Identifying the first and last digit from each line.
Forming a two-digit number by combining the first and last digits.
Summing these numbers for all lines.
Example Puzzle Input:

```text

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
```

Example Puzzle Output:

142

<style> .hidden-content { display: none; } .hover-title:hover + .hidden-content { display: block; } </style>

## Approach

<div class="hover-title">Hover to reveal approach</div> <div class="hidden-content"> 1. **Extract digits**: For each line, identify the first and last digit. 2. **Form the two-digit number**: Concatenate the first and last digits from each line. 3. **Summing the calibration values**: After calculating the two-digit numbers for each line, sum them all up to get the final result. </div>

## Answer

<div class="hover-title">Hover to reveal answer</div> <div class="hidden-content"> Your final answer for the puzzle is the sum of all calibration values. For the example above, the answer is `142`. In your actual puzzle input, your answer was `54450`. </div>

## Conclusion

<div class="hover-title">Hover to reveal conclusion</div> <div class="hidden-content"> This puzzle challenges you to work with string manipulation and number extraction. By carefully parsing the data and recovering the calibration values, you restore the Elves' snow production calibration and get one step closer to completing your mission! </div>
