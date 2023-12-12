const cond = (el) => {
    return el !== undefined && el !== '.';
}

const getMiddleNumber = (engine, i, j, number) => {
    if (!isDigit(engine[i][j - 1]) && !isDigit(engine[i][j + 1])) {
        return number;
    }
    if (isDigit(engine[i][j - 1]) && isDigit(engine[i][j + 1])) {

        return getLeftNumber(engine, i, j - 1, engine[i][j - 1] + "") + number +
            getRightNumber(engine, i, j + 1, engine[i][j + 1] + "");
    }
    if (isDigit(engine[i][j - 1])) {
        return getLeftNumber(engine, i, j - 1, engine[i][j - 1] + number);
    }
    if (isDigit(engine[i][j + 1])) {
        return getRightNumber(engine, i, j + 1, number + engine[i][j + 1]);
    }
    return number;
}

const getLeftNumber = (engine, i, j, number) => {
    if (!isDigit(engine[i][j - 1])) {
        return number;
    }
    return getLeftNumber(engine, i, j - 1, engine[i][j - 1] + number);
}

const getRightNumber = (engine, i, j, number) => {
    if (!isDigit(engine[i][j + 1])) {
        return number;
    }
    return getRightNumber(engine, i, j + 1, number + engine[i][j + 1]);
}

const isDigit = (c) => {
    return c >= '0' && c <= '9';
}

const isDigitOrDot = (c) => {
    return c >= '0' && c <= '9' || c == '.';
}

const part2 = (engine, i, j) => {
    let power = 1;
    let count = 0;
    //check top/bottom row (if the middle is digit it means it adjusted only to 1 number at top.
    if (isDigit(engine[i - 1][j])) {
        count++;
        power *= Number(getMiddleNumber(engine, i - 1, j, engine[i - 1][j] + ""));
    } else {
        if (isDigit(engine[i - 1][j - 1])) {
            count++;
            power *= Number(getLeftNumber(engine, i - 1, j - 1, engine[i - 1][j - 1] + ""));
        }
        if (isDigit(engine[i - 1][j + 1])) {
            count++;
            power *= Number(getRightNumber(engine, i - 1, j + 1, engine[i - 1][j + 1] + ""));
        }
    }

    if (isDigit(engine[i + 1][j])) {
        count++;
        power *= Number(getMiddleNumber(engine, i + 1, j, engine[i + 1][j] + ""));
    } else {
        if (isDigit(engine[i + 1][j - 1])) {
            count++;
            power *= Number(getLeftNumber(engine, i + 1, j - 1, engine[i + 1][j - 1] + ""));
        }
        if (isDigit(engine[i + 1][j + 1])) {
            count++;
            power *= Number(getRightNumber(engine, i + 1, j + 1, engine[i + 1][j + 1] + ""));
        }
    }
    if (isDigit(engine[i][j - 1])) {
        count++;
        power *= Number(getLeftNumber(engine, i, j - 1, engine[i][j - 1] + ""));
    }
    if (isDigit(engine[i][j + 1])) {
        count++;
        power *= Number(getRightNumber(engine, i, j + 1, engine[i][j + 1] + ""));
    }


    if (count != 2) {
        return 0;
    }
    return power;
}

import { getStringFromFile } from "./utils";

let input = getStringFromFile();

let sum = 0;
let sum2 = 0;
let toAdd = false;
let number = '';
let lines = input.split("\n");
let l = lines.map(l => l.split(''))
for (let i = 0; i < l.length; i++) {
    for (let j = 0; j < l[i].length; j++) {
        const el = l[i][j];
        if (el == '*') {
            sum2 += part2(l, i, j);
        }
        if (!isNaN(el)) {
            number += el;
            const havePrevLine = l[i - 1] !== undefined;
            const haveNextLine = l[i + 1] !== undefined;
            if ((havePrevLine && (cond(l[i - 1][j - 1]) || cond(l[i - 1][j]) || cond(l[i - 1][j + 1])))
                || (haveNextLine && (cond(l[i + 1][j - 1]) || cond(l[i + 1][j]) || cond(l[i + 1][j + 1])))
                || (cond(l[i][j - 1]) && isNaN(l[i][j - 1])) || (cond(l[i][j + 1]) && isNaN(l[i][j + 1]))) {
                toAdd = true;
            }
        } else {
            if (toAdd && number.length) {
                sum += Number(number);
            }

            toAdd = false;
            number = '';
        }
    }

    if (toAdd && number.length) {
        sum += Number(number);
    }


    toAdd = false;
    number = '';

}

console.log("sum: ", sum)

console.log("sum2: ", sum2)