import { getStringFromFile } from "./utils";

let input = getStringFromFile();


export const getMulRes = (input: string) => {
    return input
        .split("\n")
        .join("")
        .match(/mul\(\d+,\d+\)/g)
        .map((mul) => mul.match(/\d+/g).map(Number))
        .reduce((acc, [a, b]) => acc + a * b, 0);
}


const getCleanedMulRes = (input: string) => {
    return input.split("\n")
        .join("")
        .split("do()")
        .map((line) => line.split("don't()")[0])
        .reduce((acc, line) => acc + getMulRes(line), 0);
};

// Outputs
console.log('part1: ', getMulRes(input));
console.log('part2: ', getCleanedMulRes(input));