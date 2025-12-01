import { getStringFromFile } from "./utils";

let input = getStringFromFile();


const getSteps = (input: string, isPart2 = false) => {
    const lines2 = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(""));
    const lines = lines2.map(row => row.map(cell => (cell === '.' ? ' ' : cell)));
    let steps = 0;
    let visited = new Set();

    const directions = [
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 }
    ];

    let rows = lines.length;
    let cols = lines[0].length;

    let start = null;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (lines[r][c] === '^') {
                start = { x: r, y: c };
                break;
            }
        }
        if (start) break;
    }

    if (isPart2) {
        const loopCausingLocations = [];

        const positionsToTest = [
            { x: start.x, y: start.y },
            ...lines
                .flatMap((row, r) =>
                    row.map((cell, c) => (cell === '.' ? { x: r, y: c } : null))
                )
                .filter(pos => pos !== null)
        ];

        for (const { x, y } of positionsToTest) {
            const original = lines[x][y];
            lines[x][y] = '#';

            if (detectLoop(lines, start, directions)) {
                loopCausingLocations.push({ x, y });
            }

            lines[x][y] = original;
        }

        return loopCausingLocations.length;
    } else {
        let directionIndex = 0;
        let x = start.x, y = start.y;
        visited.add(`${x},${y}`);

        while (true) {
            let nextX = x + directions[directionIndex].dx;
            let nextY = y + directions[directionIndex].dy;

            if (nextX < 0 || nextY < 0 || nextX >= rows || nextY >= cols) {
                steps++;
                break;
            }

            if (lines[nextX][nextY] === '#') {
                directionIndex = (directionIndex + 1) % 4;
            } else {
                x = nextX;
                y = nextY;
                visited.add(`${x},${y}`);
                steps++;
            }
        }
    }

    return visited.size;
};



function detectLoop(labyrinth, start, directions) {
    const rows = labyrinth.length;
    const cols = labyrinth[0].length;
    const visited = new Set();

    let x = start.x;
    let y = start.y;
    let directionIndex = 0;

    while (true) {
        const key = `${x},${y}`;
        if (visited.has(key)) {
            return true;
        }
        visited.add(key);

        const nextX = x + directions[directionIndex].dx;
        const nextY = y + directions[directionIndex].dy;

        if (nextX < 0 || nextY < 0 || nextX >= rows || nextY >= cols) {
            return false;
        }

        if (labyrinth[nextX][nextY] === '#') {
            directionIndex = (directionIndex + 1) % 4;
        } else {
            x = nextX;
            y = nextY;
        }
    }
}

// Outputs
console.log('part1: ', getSteps(input));
console.log('part2: ', getSteps(input, true));