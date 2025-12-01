import { getStringFromFile } from "./utils";

let input = getStringFromFile();


const day1 = (input: string) => {
    const parsed = input.split('\n').slice(0, -1);

    let pointer = 50;
    let counter = 0;
    let counter2 = 0;
    parsed.forEach(d => {
        const n = Number(d.slice(1));
        for (let i = 0; i < n; i++) {
            d.startsWith('R') ? pointer++ : pointer--;
            if (pointer < 0 || pointer > 99) {
                pointer = ((pointer % 100) + 100) % 100;
            }
            if (pointer === 0) counter2++;
        }
        if (pointer === 0) counter++;
    });


    return { part1: counter, part2: counter2 }
};

// Outputs
console.log(day1(input));