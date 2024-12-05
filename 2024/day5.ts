import { getStringFromFile } from "./utils";

let input = getStringFromFile();

const updates = (input: string, isPart2 = false) => {
    const { rules, updates } = parse(input);
    const validUpdates = updates.filter((update) =>
        rules.every((rule) => validate(rule, update)),
    );

    let result = 0;

    if (isPart2) {
        const rulesMap = createRulesMap(rules);
        const invalidUpdates = updates.filter((update) =>
            rules.some((rule) => !validate(rule, update))
        );
        const fixedUpdates = invalidUpdates.map((update) =>
            forceOrder(rulesMap, update)
        );
        for (let update of fixedUpdates) {
            result += update[(update.length - 1) / 2];
        }
    } else {
        for (let update of validUpdates) {
            result += update[(update.length - 1) / 2];
        }
    }

    return result;
};


function validate(rule: { first: number, second: number }, update: number[]) {
    const firstIndex = update.indexOf(rule.first);
    const secondIndex = update.indexOf(rule.second);
    if (firstIndex === -1 || secondIndex === -1) {
        return true;
    }
    return firstIndex < secondIndex;
}

function getLines(input: string) {
    return input
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
}


function parseRules(input: string): { first: number, second: number }[] {
    return getLines(input).map((l) => {
        const [first, second] = l.split("|");
        return { first: Number(first), second: Number(second) };
    });
}

function parseUpdates(input: string) {
    return getLines(input).map((l) => l.split(",").map((page) => Number(page)));
}

function parse(input: string) {
    const [rulesRaw, updatesRaw] = input.split("\n\n");
    return { rules: parseRules(rulesRaw), updates: parseUpdates(updatesRaw) };
}


//part2 
function createRulesMap(rules) {
    const rulesMap = new Map();
    for (const rule of rules) {
        addRuleToMap(rulesMap, rule.first, rule.second);
    }
    return rulesMap;
};

function addRuleToMap(rulesMap, first, second) {
    if (!rulesMap.has(first)) {
        rulesMap.set(first, new Map());
    }
    if (!rulesMap.has(second)) {
        rulesMap.set(second, new Map());
    }
    rulesMap.get(first).set(second, -1);
    rulesMap.get(second).set(first, 1);
};

function compare(rulesMap, a, b) {
    const result = rulesMap.get(a)?.get(b);
    if (result !== undefined) {
        return result;
    }
};

function forceOrder(rulesMap, update) {
    return [...update].sort((a, b) => compare(rulesMap, a, b));
};



// Outputs
console.log('part1: ', updates(input));
console.log('part2: ', updates(input, true));