import { getStringFromFile } from "./utils";

let input = getStringFromFile();

const part1 = (input: string) => {
  const lines = input.split("\n");
  const [time, distance] = input
    .split("\n")
    .map((line) =>
      line.trim().split(" ").filter(Boolean).slice(1).map(Number)
    );
  const res = time.reduce((acc, time, i) => {
    const sqrt = Math.sqrt(time ** 2 - 4 * distance[i]);
    const ib =
      Math.ceil((time + sqrt) / 2) - Math.floor((time - sqrt) / 2) - 1;
    return acc * ib;
  }, 1);

  return res;
}

const part2 = (input: string) => {
  const [time, distance] = input
    .split("\n")
    .map((line) => Number(line.replaceAll(" ", "").split(":")[1]));
  const sqrt = Math.sqrt(time ** 2 - 4 * distance);
  const res = Math.ceil((time + sqrt) / 2) - Math.floor((time - sqrt) / 2) - 1;

  return res;
}

console.log("Part 1: ", part1(input));
console.log("Part 2: ", part2(input));