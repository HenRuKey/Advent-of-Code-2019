/**
 * Test a number to see if the digits increase in value left to right.
 * @param {int} num the number to test.
 * @return {boolean} true if the number passes the test.
 */
let increaseTest = (num) => {
    let snum = JSON.stringify(num);
    for (let i = 0; i < snum.length; i++) {
        let numBase = parseInt(snum[i]);
        let seg = snum.slice(i+1);
        let numSeg = parseInt(seg);
        if (numSeg < numBase * (10 ** (seg.length - 1))) {
            return false;
        }
    }
    return true;
};

/**
 * Test to see if there are any repeating groups of digits in the number.
 * @example 111222 would return true, 121212 would return false.
 * @param {int} num the number to test.
 * @return {boolean} true if the number passes the test.
 */
let repeatTest = (num) => {
    let snum = JSON.stringify(num);
    let repeatFound = false;
    for (let i = 0; i < snum.length - 1; i++) {
        if (snum[i] == snum[i + 1]) {
            repeatFound = true;
            break;
        }
    }
    return repeatFound;
};

/**
 * Determines if the number contains a single pair of repeating digits.
 * @param {int} num the number to test.
 * @return {boolean} true if the number passes the test.
 */
let advancedRepeatTest = (num) => {
    if (!increaseTest(num) || !repeatTest(num)) { return false; }
    let snum = JSON.stringify(num);
    let repeats = 0;
    let lastNum = snum[0];
    for (let i = 1; i < snum.length; i++) {
        if (snum[i] === lastNum) {
            repeats += 1;
        }
        else {
            if (repeats > 0 && repeats == 1) {
                return true;
            }
            repeats = 0;
        }
        lastNum = snum[i];
    }
    return repeats > 0 && repeats == 1;
};

/**
 * Finds all possible password values between the given min and max.
 * @param {int} min the minimum possible value.
 * @param {int} max the maximum possible value.
 * @return {Array.<int>} the possible values that satisfy the test conditions.
 */
let findPossibleValues = (min, max) => {
    let possibleValues = [];
    for (let i = min; i < max; i++) {
        if (increaseTest(i) && repeatTest(i)) {
            possibleValues.push(i);
        }
    }
    return possibleValues;
};

/**
 * Finds all possible values that satisfy the conditions of the advanced test.
 * @param {Array.<int>} possibleValues the values that passed the initial test.
 * @return {Array.<int>} the subset of values that pass the advanced test.
 */
let filterPossibleValues = (possibleValues) => {
    return possibleValues.filter(value => {
        return advancedRepeatTest(value);
    });
};

(() => {
    let minValue = 138307;
    let maxValue = 654504;
    let possibleValues = findPossibleValues(minValue, maxValue);
    console.log(`Part 1 Solution: ${ possibleValues.length }`);
    let filteredValues = filterPossibleValues(possibleValues);
    console.log(`Part 2 Solution: ${ filteredValues.length }`);
})();