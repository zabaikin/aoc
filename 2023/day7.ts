import { getStringFromFile } from "./utils";

const DEFAULT_CARD_ORDER = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const JOKER_CARD_ORDER = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']
type Round = [string, number]
const rankCard = (c: string, useJokers: boolean) => (useJokers ? JOKER_CARD_ORDER : DEFAULT_CARD_ORDER).indexOf(c)

function countCards(hand: string) {
    const counts = new Map<string, number>()
    for (let i = 0; i < hand.length; i++) {
        const card = hand.charAt(i)
        counts.set(card, (counts.get(card) ?? 0) + 1)
    }
    return Array.from(counts).sort((a, b) => b[1] - a[1])
}

function rankHandType(hand: string, useJokers: boolean): number {
    if (useJokers && !/J{5}/.test(hand)) {
        const oc = countCards(hand.replace(/J/g, ''))
        hand = hand.replace(/J/g, oc[0][0])
    }

    const orderedCounts = countCards(hand)
    switch (orderedCounts.length) {
        case 1:
            return 7
        case 2:
            if (orderedCounts[0][1] === 4) {
                return 6
            }
            return 5
        case 3:
            if (orderedCounts[0][1] === 3 && orderedCounts[1][1] === 1) {
                return 4
            }
            return 3
        case 4:
            return 2
        default:
            return 1;
    }
}

function compareRounds(a: Round, b: Round, useJokers: boolean): number {
    const [atr, btr] = [rankHandType(a[0], useJokers), rankHandType(b[0], useJokers)]
    if (atr !== btr) {
        return atr - btr
    }

    for (let i = 0; i < a[0].length; i++) {
        const [aRank, bRank] = [rankCard(a[0].charAt(i), useJokers), rankCard(b[0].charAt(i), useJokers)]
        if (aRank !== bRank) {
            return aRank - bRank
        }
    }

    return 0
}

function parseLines(lines: string[]): Round[] {
    return lines.map(l => {
        let [hand, bid] = l.split(' ')
        return [hand, parseInt(bid)]
    })
}

function part1(rounds: Round[]) {
    rounds = rounds.sort((a, b) => compareRounds(a, b, false))
    return rounds.reduce((acc, cur, i) => {
        return acc + (i + 1) * cur[1]
    }, 0)
}

function part2(rounds: Round[]) {
    rounds = rounds.sort((a, b) => compareRounds(a, b, true))
    return rounds.reduce((acc, cur, i) => {
        return acc + (i + 1) * cur[1]
    }, 0)
}


const input = getStringFromFile().split('\n');
const rounds = parseLines(input)

console.log("Part 1: ", part1(rounds));
console.log("Part 2: ", part2(rounds));