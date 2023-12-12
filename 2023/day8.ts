import { getStringFromFile } from "./utils";

type Nodes = Record<string, { L: string; R: string }>;

function parseNodes(nodeLines: string[]) {
    return nodeLines.reduce<Nodes>((acc, line) => {
        const [nodeId, connections] = line.split('=').map((x) => x.trim());

        console.log("connections ", nodeId, connections);
        const match = connections.match(/\((?<left>.+),\s+(?<right>.+)\)/);

        const { left, right } = match!.groups!;
        acc[nodeId] = { L: left, R: right };
        return acc;
    }, {});
}

function instructionIterator(instructions: Array<'L' | 'R'>) {
    let currentIndex = 0;

    return () => instructions[currentIndex++ % instructions.length];
}

//least common multiple
function lcm(arr: number[]): number {
    return arr.reduce((acc, n) => (acc * n) / gcd(acc, n));
}

//greatest common divisor
function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

function part1(
    instructions: Array<'L' | 'R'>,
    nodes: Nodes,
    startingNode: string,
    endCond: (node: string) => boolean
): number {
    const getNextInstruction = instructionIterator(instructions);

    let stepsCount = 0;
    let currentNode = startingNode;
    let currentInstruction: 'L' | 'R';

    while (!endCond(currentNode)) {
        currentInstruction = getNextInstruction();
        currentNode = nodes[currentNode][currentInstruction];
        stepsCount++;
    }

    return stepsCount;
}

function part2(instructions: Array<'L' | 'R'>, nodes: Nodes): number {
    const startingNodes: string[] = Object.keys(nodes).filter(
        ([, , endLetter]) => endLetter === 'A'
    );

    const cycles = startingNodes.map((startingNode) =>
        part1(
            instructions,
            nodes,
            startingNode,
            (node) => node[2] === 'Z',
        )
    );

    return lcm(cycles);
}


const input = getStringFromFile();
const [LR, , ...nodeLines] = input.split('\n');
const instructions = LR.split('') as Array<'L' | 'R'>;
const nodes = parseNodes(nodeLines);

console.log("Part1 :", part1(instructions, nodes, 'AAA', (node) => node === 'ZZZ'));
console.log("Part2 :", part2(instructions, nodes));
