import { getStringFromFile } from "./utils";

let input = getStringFromFile();


const day4 = (input: string) => {
    const parsed = input.replace(/\r/g, "")
        .split("\n")
        .filter(x => x.length > 0)
        .map(x => x.split(""));

    function countRolls(parsedInput, isPart2) {
        let part1 = 0;
        let part2 = 0;
        while (true) {
            let removedRolls = []
            for (let y = 0; y < parsedInput.length; y++) {
                const r = parsedInput[y];
                const topRow = y > 0 ? parsedInput[y - 1] : [];
                const bottomRow = y < parsedInput.length - 1 ? parsedInput[y + 1] : [];
                for (let x = 0; x < r.length; x++) {
                    if (r[x] == "@") {
                        let adjacent = 0;
                        const left = x - 1;
                        const right = x + 1;
                        if (topRow[left] == "@") adjacent++;
                        if (topRow[x] == "@") adjacent++;
                        if (topRow[right] == "@") adjacent++;
                        if (r[left] == "@") adjacent++;
                        if (r[right] == "@") adjacent++;
                        if (bottomRow[left] == "@") adjacent++;
                        if (bottomRow[x] == "@") adjacent++;
                        if (bottomRow[right] == "@") adjacent++;
                        if (adjacent < 4) {
                            if (!isPart2) part1++;
                            if (isPart2) removedRolls.push([x, y]);
                        }

                    }
                }
            }

            for (const pos of removedRolls) {
                parsedInput[pos[1]][pos[0]] = ".";
            }

            part2 = part2 + removedRolls.length;
            if (removedRolls.length == 0) break;
            if (!isPart2) break;
        }


        return isPart2 ? part2 : part1;
    }

    return { part1: countRolls(parsed, false), part2: countRolls(parsed, true) }
};

// Outputs
console.log(day4(input));
