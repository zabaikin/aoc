import { getStringFromFile } from "./utils";

let input = getStringFromFile();


const findXmas = (input: string, isPart2 = false) => {
    const lines = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(""));
    let found = 0;

    if (isPart2) {
        for (let y = 1; y < lines.length - 1; y++) {
            for (let x = 1; x < lines[y].length - 1; x++) {
                if (lines[y][x] != "A") continue;

                if (lines[y - 1][x - 1] == "M" && lines[y + 1][x + 1] == "S") {
                    if (lines[y + 1][x - 1] == "M" && lines[y - 1][x + 1] == "S") found++;
                    if (lines[y - 1][x + 1] == "M" && lines[y + 1][x - 1] == "S") found++;
                    continue;
                }
                if (lines[y - 1][x + 1] == "M" && lines[y + 1][x - 1] == "S") {
                    if (lines[y + 1][x + 1] == "M" && lines[y - 1][x - 1] == "S") found++;
                    if (lines[y - 1][x - 1] == "M" && lines[y + 1][x + 1] == "S") found++;
                    continue;
                }
                if (lines[y + 1][x - 1] == "M" && lines[y - 1][x + 1] == "S") {
                    if (lines[y - 1][x - 1] == "M" && lines[y + 1][x + 1] == "S") found++;
                    if (lines[y + 1][x + 1] == "M" && lines[y - 1][x - 1] == "S") found++;
                    continue;
                }
                if (lines[y + 1][x + 1] == "M" && lines[y - 1][x - 1] == "S") {
                    if (lines[y - 1][x + 1] == "M" && lines[y + 1][x - 1] == "S") found++;
                    if (lines[y + 1][x - 1] == "M" && lines[y - 1][x + 1] == "S") found++;
                    continue;
                }
            }
        }
    } else {
        for (let y = 0; y < lines.length; y++) {
            for (let x = 0; x < lines[y].length; x++) {
                if (lines[y][x] != "X") continue;

                if (y > 2) {
                    if (lines[y - 1][x - 1] == "M" && lines[y - 2][x - 2] == "A" && lines[y - 3][x - 3] == "S") found++;
                    if (lines[y - 1][x] == "M" && lines[y - 2][x] == "A" && lines[y - 3][x] == "S") found++;
                    if (lines[y - 1][x + 1] == "M" && lines[y - 2][x + 2] == "A" && lines[y - 3][x + 3] == "S") found++;
                }

                if (lines[y][x - 1] == "M" && lines[y][x - 2] == "A" && lines[y][x - 3] == "S") found++;
                if (lines[y][x + 1] == "M" && lines[y][x + 2] == "A" && lines[y][x + 3] == "S") found++;

                if (y < lines.length - 3) {
                    if (lines[y + 1][x - 1] == "M" && lines[y + 2][x - 2] == "A" && lines[y + 3][x - 3] == "S") found++;
                    if (lines[y + 1][x] == "M" && lines[y + 2][x] == "A" && lines[y + 3][x] == "S") found++;
                    if (lines[y + 1][x + 1] == "M" && lines[y + 2][x + 2] == "A" && lines[y + 3][x + 3] == "S") found++;
                }
            }
        }
    }

    return found;
};

// Outputs
console.log('part1: ', findXmas(input));
console.log('part2: ', findXmas(input, true));