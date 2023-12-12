import { getStringFromFile } from "./utils";

let input = getStringFromFile();

const part1 = (input: string) => {
    const getPoints = (winNum) => {
        let sum = 0;
        if (winNum === 0) {
            return sum;
        }
        for (let i = 0; i < winNum; i++) {
            sum = i === 0 ? 1 : 2 * sum;
        }

        return sum;
    }

    let lines = input.split("\n").map(l => l.split(':')[1])
    let sum = lines.reduce((ac, l) => {
        l.split('|');
        let winning = l.split('|')[0].split(' ').filter(n => n);
        let numbers = l.split('|')[1].split(' ').filter(n => n)
        let winNum = numbers.filter(n => winning.includes(n));
        return ac + getPoints(winNum.length);
    }, 0);

    return sum;
}

const part2 = (input: string) => {
    let sum2 = 0;
    const lines = input.split("\n");
    let cardCount = Array(lines.length + 1).fill(1);
    cardCount[0] = 0;
    for (let row = 0; row < lines.length; row++) {
        const line = lines[row];
        const cardId = line.match(/\d+/)[0] * 1;
        const winning = line.split(":")[1].split("|")[0].match(/(\d+)/g);
        const numbers = line.split(":")[1].split("|")[1].match(/(\d+)/g);
        let found = 0;
        winning.forEach((winningNumber) => {
            if (numbers.includes(winningNumber)) {
                found++;
            }
        });
        let lineScore = 0;
        if (found > 0) lineScore = 2 ** (found - 1);
        for (let i = 1; i <= found; i++) {
            cardCount[cardId + i] += cardCount[cardId];
        }
    };

    cardCount.forEach((val) => {
        sum2 += val;
    });
    return sum2;
}

console.log("Part 1: ", part1(input));
console.log("Part 2: ", part2(input));
