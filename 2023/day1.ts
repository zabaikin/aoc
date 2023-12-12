import { getStringFromFile } from "./utils";

let input = getStringFromFile();

const part1 = (input: string) => {
    let result = 0;
    const lines = input.split('\n');

    for (const line of lines) {
        const digits = line.replace(/\D/g, "");
        result += parseInt(digits[0] + (digits[digits.length - 1] ?? digits[0]));
    }
    return result;
}

const part2 = (input: string) => {
    const numbersMap = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    }
    let result = 0;
    const lines = input.split('\n');

    for (const line of lines) {
        const numbers = [];
        for (const [key, value] of Object.entries(numbersMap)) {
            numbers.push(...line.matchAll(new RegExp(key, "g")), ...line.matchAll(new RegExp(String(value), "g")));
        }
        numbers.sort((a, b) => a.index - b.index);

        result += parseInt(`${numbers[0][0].length > 1 ? numbersMap[numbers[0][0]] : parseInt(numbers[0][0])
            }${numbers[numbers.length - 1][0].length > 1 ? numbersMap[numbers[numbers.length - 1][0]] : parseInt(numbers[numbers.length - 1][0])
            }`);
    }
    return result;
}

console.log('part1: ', part1(input))
console.log('part2: ', part2(input))