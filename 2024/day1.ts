import { getStringFromFile } from "./utils";

let input = getStringFromFile();


const calculateDistance = (input: string, isPart2 = false) => {
    let distance = 0;
    const leftList: number[] = [];
    const rightList: number[] = [];

    input.split('\n').forEach(line => {
        const [left, right] = line.trim().split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    });

    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);

    if (isPart2) {
        const countOccurrences = (sortedArray: number[], target: number): number => {
            let count = 0;
            for (let num of sortedArray) {
                if (num === target) count++;
                if (num > target) break;
            }
            return count;
        };

        for (const leftValue of leftList) {
            distance += leftValue * countOccurrences(rightList, leftValue);
        }
    } else {
        for (let i = 0; i < leftList.length; i++) {
            distance += Math.abs(leftList[i] - rightList[i]);
        }
    }

    return distance;
};

// Outputs
console.log('part1: ', calculateDistance(input));
console.log('part2: ', calculateDistance(input, true));