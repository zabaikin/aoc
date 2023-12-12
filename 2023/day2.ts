import { getStringFromFile } from "./utils";

let input = getStringFromFile();

const part1 = (input: string) => {
    let result = 0;
    const lines = input.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const game = line.split(": ")[1].split("; ").map(x => {
            const result = {
                red: 0,
                green: 0,
                blue: 0
            }
            const objects = x.split(", ");
            for (const object of objects) {
                if (object.endsWith("red")) result.red = parseInt(object.split(" ")[0]);
                if (object.endsWith("green")) result.green = parseInt(object.split(" ")[0]);
                if (object.endsWith("blue")) result.blue = parseInt(object.split(" ")[0]);
            }

            return result;
        });
        const redMax = Math.max(...game.map(x => x.red));
        const greenMax = Math.max(...game.map(x => x.green));
        const blueMax = Math.max(...game.map(x => x.blue));
        if (redMax <= 12 && greenMax <= 13 && blueMax <= 14) result += i + 1;
    }
    return result;
}

const part2 = (input: string) => {
    let result = 0;
    const lines = input.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const game = line.split(": ")[1].split("; ").map(x => {
            const result = {
                red: 0,
                green: 0,
                blue: 0
            }
            const objects = x.split(", ");
            for (const object of objects) {
                if (object.endsWith("red")) result.red = parseInt(object.split(" ")[0]);
                if (object.endsWith("green")) result.green = parseInt(object.split(" ")[0]);
                if (object.endsWith("blue")) result.blue = parseInt(object.split(" ")[0]);
            }

            return result;
        });
        const redMax = Math.max(...game.map(x => x.red));
        const greenMax = Math.max(...game.map(x => x.green));
        const blueMax = Math.max(...game.map(x => x.blue));
        result += redMax * greenMax * blueMax;
    }
    return result;
}

console.log('part1: ', part1(input))
console.log('part2: ', part2(input))