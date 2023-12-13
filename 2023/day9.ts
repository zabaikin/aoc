import { getStringFromFile } from "./utils";


function getDiffsPyramid(history: number[]) {
    const diffsPyramid: number[][] = [history];

    while (diffsPyramid[diffsPyramid.length - 1].some((n) => n !== 0)) {
        diffsPyramid.push(getDiffs(diffsPyramid[diffsPyramid.length - 1]));
    }

    return diffsPyramid;
}

function getDiffs(nums: number[]) {
    const diffs = [];
    for (let i = 1; i < nums.length; i++) {
        diffs.push(nums[i] - nums[i - 1]);
    }
    return diffs;
}

function extrapolate(pyramid: number[][], isPart2: boolean = false) {
    const newPyramid = pyramid.map((n) => [...n]);

    const newVal = <T>(arr: T[], val: T) =>
        arr[isPart2 ? 'unshift' : 'push'](val);

    const getVal = <T>(arr: T[]) => (isPart2 ? arr[0] : arr[arr.length - 1]);

    for (let level = newPyramid.length - 1; level >= 0; level--) {
        const currentLevel = newPyramid[level];
        const nextLevel = newPyramid[level + 1];

        if (nextLevel === undefined) {
            newVal(currentLevel, 0);
        } else {
            const val = getVal(currentLevel);
            const nextLevelVal = getVal(nextLevel);
            newVal(
                currentLevel,
                isPart2 ? val - nextLevelVal : val + nextLevelVal
            );
        }
    }

    return getVal(newPyramid[0]);
}

function part1(lines: string[]): number {
    const pyramids = lines.map((line) =>
        line
            .trim()
            .split(' ')
            .map((n) => parseInt(n, 10))
    )
        .map(getDiffsPyramid);
    return pyramids.map((pyramid) => extrapolate(pyramid)).reduce((a, b) => a + b);
}

function part2(lines: string[]): number {
    const pyramids = lines.map((line) =>
        line
            .trim()
            .split(' ')
            .map((n) => parseInt(n, 10))
    )
        .map(getDiffsPyramid);
    return pyramids.map((pyramid) => extrapolate(pyramid, true)).reduce((a, b) => a + b);
}


const input = getStringFromFile();

console.log("Part1 :", part1(input.split('\n')));
console.log("Part2 :", part2(input.split('\n')));