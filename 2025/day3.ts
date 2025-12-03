import { getStringFromFile } from "./utils";

let input = getStringFromFile();


const day3 = (input: string) => {
    const parsed = input.split('\n');
    let part1 = 0;
    let part2 = 0;

    function maxNumber(str, K) {
        const digits = [...str].map(Number);
        const n = digits.length;
        const stack = [];

        for (let i = 0; i < n; i++) {
            const d = digits[i];

            while (stack.length > 0 &&
                d > stack[stack.length - 1] &&
                (stack.length - 1 + (n - i)) >= K) {
                stack.pop();
            }

            if (stack.length < K) {
                stack.push(d);
            }
        }

        return Number(stack.join(""));
    }

    parsed.forEach(d => {
        part1 = part1 + maxNumber(d, 2);
        part2 = part2 + maxNumber(d, 12);
    });

    return { part1: part1, part2: part2 }
};

// Outputs
console.log(day3(input));