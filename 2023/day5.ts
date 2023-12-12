import { getStringFromFile } from "./utils";

let input = getStringFromFile();

const processSeedRanges = (section) => {
    const seeds = section.split(':')[1].trim().split(/\s+/).map(Number)

    return seeds.reduce((ranges, value, i) => {
        if (i % 2 === 0) {
            ranges.push([value, seeds[i + 1]])
        }

        return ranges
    }, [])
}

const processCategory = (section) => {
    const [title, values] = section.split(':\n')

    const mapping = values.split('\n').map((line) => {
        const [destStart, srcStart, rangeLength] = line.split(/\s+/).map(Number)

        return [destStart, srcStart, rangeLength]
    })

    return { title, mapping }
}

const processInput = (input) => {
    const sections = input.split('\n\n')

    return sections.reduce((acc, section) => {
        if (section.startsWith('seeds:')) {
            acc.seedRanges = processSeedRanges(section)
        } else {
            const { title, mapping } = processCategory(section)

            acc.categories = acc.categories || {}
            acc.categories[title] = acc.categories[title] || []
            acc.categories[title] = mapping || []
        }

        return acc
    }, {})
}

const convertRange = (range, mapping) => {
    let [start, length] = range
    let convertedRanges = []

    mapping.forEach(([destStart, srcStart, rangeLength]) => {
        let srcEnd = srcStart + rangeLength

        if (start < srcEnd && start + length > srcStart) {
            let overlapStart = Math.max(start, srcStart)
            let overlapEnd = Math.min(start + length, srcEnd)
            let newStart = destStart + (overlapStart - srcStart)

            convertedRanges.push([newStart, overlapEnd - overlapStart])
        }
    })

    return convertedRanges.length > 0 ? convertedRanges : [[start, length]]
}

const convertThroughCategories = (seedRange, categories) => {
    let currentRanges = [seedRange]

    for (const category in categories) {
        let newRanges = []

        currentRanges.forEach((range) => {
            convertRange(range, categories[category]).forEach((convertedRange) => {
                newRanges.push(convertedRange)
            })
        })

        currentRanges = newRanges
    }

    return currentRanges
}

const findLowestLocationNumber = (almanac) => {
    let lowestLocation = Number.MAX_SAFE_INTEGER

    almanac['seedRanges'].forEach((seedRange) => {
        const locationRanges = convertThroughCategories(seedRange, almanac['categories'])

        locationRanges.forEach(([start]) => {
            if (start < lowestLocation) {
                lowestLocation = start
            }
        })
    })

    return lowestLocation
}

const almanac = processInput(input)
const result = findLowestLocationNumber(almanac)

console.log("Part 2: ", result);