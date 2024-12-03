import { getStringFromFile } from "./utils";

let input = getStringFromFile();


const checkSafe = (input: string, isPart2 = false) => {
    let result = 0;
    const lines = input.split('\n');

    if (isPart2) {
        for (const line of lines) {
            const newLine = line.split(' ').map(n => parseInt(n));
            if (checkIncreasingOrDecreasing(newLine)) {
                result += checkIncreasingOrDecreasing(newLine)
            } else {
                for (let i = 0; i < newLine.length; i++) {
                    const dampened = [...newLine];
                    dampened.splice(i, 1);
                    if (checkIncreasingOrDecreasing(dampened)) {
                        result += checkIncreasingOrDecreasing(dampened)
                        break;
                    }
                }
            }
        }

    } else {
        for (const line of lines) {
            const newLine = line.split(' ').map(n => parseInt(n));
            result += checkIncreasingOrDecreasing(newLine)
        }
    }

    return result;
};

function checkIncreasingOrDecreasing(arr) {
    let res = 0;
    let m = 0;

    for (let i = 1; i < arr.length; i++) {
        const curr = arr[i];
        const prev = arr[i - 1];
        const diff = Math.abs(curr - prev);

        if (diff < 1 || diff > 3) {
            m = 0;
            break;
        }

        if ((m > 0 && curr < prev) || (m < 0 && curr > prev)) {
            m = 0;
            break;
        }

        if (m === 0) {
            m = prev < curr ? 1 : -1;
        }
    }

    if (m) res++;

    return res;
}

// Outputs
console.log('part1: ', checkSafe(input));
console.log('part2: ', checkSafe(input, true));