"use strict";
// import * as fs from 'fs'
// const data = fs.readFileSync('./data.txt', 'utf8').split(`\n`)
// console.log(data.length)
// const chunkSize = 10
// async function determineCooordinates(data): Promise<number | string> {
//   if (!data) {
//     return `Data loaded incorrectly`
//   }
//   const chunkedData = splitDataUp(data, chunkSize)
//   if (!chunkedData) {
//     return `issue splitting data`
//   }
//   try {
//     const sumResults = await processChunkConcurrently(chunkedData)
//     const totalSum = sumResults.reduce((acc, curr) => acc + curr, 0)
//     return totalSum
//   } catch (error) {
//     return `error processing chunks: ${error}`
//   }
// }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// function splitDataUp(data: string[], numberOfChunks: number): string[][] {
//   let chunks: string[][] = []
//   const linesInChunk = Math.ceil(data.length / numberOfChunks)
//   for (let i = 0; i < data.length; i += linesInChunk) {
//     let end = i + linesInChunk
//     if (end > data.length) {
//       end = data.length
//     }
//     const newChunk = data.slice(i, end)
//     chunks.push(newChunk)
//   }
//   return chunks
// }
// function findChunksSum(data: string[]): number {
//   let localSum = 0
//   for (let line in data) {
//     let numSeen: number[] = []
//     for (let i = 0; i < line.length; i++) {
//       if (!isNaN(parseInt(line[i]))) {
//         numSeen.push(parseInt(line[i]))
//       }
//     }
//     localSum += numSeen[0] + numSeen[numSeen.length - 1]
//   }
//   return localSum
// }
// async function processChunkConcurrently(data: string[][]): Promise<number[]> {
//   const promises = data.map(
//     (data) =>
//       new Promise<number>((resolve) => {
//         const chunkSum = findChunksSum(data)
//         resolve(chunkSum)
//       })
//   )
//   return Promise.all(promises)
// }
// determineCooordinates(data)
//   .then((result) => {
//     console.log('Total Sum of lines:', result)
//   })
//   .catch((err) => {
//     console.error('Error processing:', err)
//   })
var fs_1 = require("fs");
var path = require("path");
var startMainTimer = Date.now();
// Read file synchronously
var filePath = path.join(__dirname, 'data.txt');
var lines;
try {
    var fileContent = (0, fs_1.readFileSync)(filePath, 'utf-8');
    lines = fileContent.split('\n');
}
catch (err) {
    console.error('Error opening file:', err);
    process.exit(1);
}
var chunkSize = 10;
var chunkedLines = splitFileIntoChunks(lines, chunkSize);
var findChunkSum = function (chunk, id) { return __awaiter(void 0, void 0, void 0, function () {
    var timer, totalSum, _i, chunk_1, line, digitsInLine, currentLineSum, _a, line_1, char;
    return __generator(this, function (_b) {
        console.log("Processing chunk ".concat(id));
        timer = Date.now();
        totalSum = 0;
        for (_i = 0, chunk_1 = chunk; _i < chunk_1.length; _i++) {
            line = chunk_1[_i];
            digitsInLine = [];
            currentLineSum = 0;
            for (_a = 0, line_1 = line; _a < line_1.length; _a++) {
                char = line_1[_a];
                if (/\d/.test(char)) {
                    digitsInLine.push(char);
                }
            }
            if (digitsInLine.length > 0) {
                currentLineSum = parseInt(digitsInLine[0] + digitsInLine[digitsInLine.length - 1], 10);
            }
            totalSum += currentLineSum;
        }
        console.log("Goroutine took ".concat(Date.now() - timer, "ms"));
        return [2 /*return*/, totalSum];
    });
}); };
var processChunks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var chunkPromises, chunkSums;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chunkPromises = chunkedLines.map(function (chunk, index) {
                    return findChunkSum(chunk, index);
                });
                return [4 /*yield*/, Promise.all(chunkPromises)];
            case 1:
                chunkSums = _a.sent();
                return [2 /*return*/, chunkSums.reduce(function (acc, sum) { return acc + sum; }, 0)];
        }
    });
}); };
processChunks()
    .then(function (totalSum) {
    console.log('Total Sum:', totalSum);
    console.log('This entire operation took:', Date.now() - startMainTimer, 'ms');
})
    .catch(function (err) {
    console.error('Error processing chunks:', err);
});
function splitFileIntoChunks(data, numChunks) {
    var chunks = [];
    var chunkSize = Math.ceil(data.length / numChunks);
    for (var i = 0; i < data.length; i += chunkSize) {
        var end = Math.min(i + chunkSize, data.length);
        chunks.push(data.slice(i, end));
    }
    return chunks;
}
