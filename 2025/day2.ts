import { getStringFromFile } from "./utils";

let input = getStringFromFile();


const day2 = (input: string) => {
    const parsed = input.replace(/(\r\n|\n|\r)/gm, "").split(',');
    let part1 = 0;
    let part2 = 0;

    function getInvalidIDs(str) {
        if (str.length % 2 !== 0) return 0;

        const half = str.length / 2;
        const chunk = str.slice(0, half);

        return chunk === str.slice(half) ? Number(str) : 0;
    }

    function getInvalidIDsPart2(str) {

        for (let size = 1; size <= str.length / 2; size++) {
            if (str.length % size !== 0) continue;

            const chunk = str.slice(0, size);

            let valid = true;
            for (let i = size; i < str.length; i += size) {
                if (str.slice(i, i + size) !== chunk) {
                    valid = false;
                    break;
                }
            }
            if (valid) return Number(str);
        }

        return 0;
    }

    parsed.forEach(d => {
        const range = d.split('-')
        for (let i = Number(range[0]); i <= Number(range[1]); i++) {
            part1 = part1 + getInvalidIDs(i.toString());
            part2 = part2 + getInvalidIDsPart2(i.toString())
        }
    });

    return { part1: part1, part2: part2 }
};

// Outputs
console.log(day2(input));