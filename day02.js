import { readIntsFromFile } from './lib/fileIO'

/**
 * Retrieves intcode instruction from puzzle input file.
 */
let getIntcode = () => {
    let nums = readIntsFromFile('./puzzle_input/day02_input.txt', ',');
    nums[1] = 12;
    nums[2] = 2;
    return nums;
};

/**
 * Executes a given array of intcode.
 * @param {Array.<int>} intcode the intcode to execute.
 */
let executeIntcode = (intcode) => {
    let startIndex = 0;
    while (readIntcodeSegment(intcode.slice(startIndex, startIndex + 4), intcode)) {
        startIndex += 4;
    }
};

/**
 * Reads a segment of four intcode indices and performs the operation.
 * @param {Array.<int>} intcodeSegment the intcode segment of four ints.
 * @param {Array.<int>} intcode the complete array of intcode.
 * @return {boolean} true if the operation is not a termination opcode.
 */
let readIntcodeSegment = (intcodeSegment, intcode) => {

    let operation = intcodeSegment[0];

    if (operation == 99) { return false; }

    let a = intcode[intcodeSegment[1]];
    let b = intcode[intcodeSegment[2]];
    let resultAddress = intcodeSegment[3];

    if (resultAddress == 0) { console.log("FOUND"); }

    switch (operation) {
        case 1:
            intcode[resultAddress] = a + b;
            break;
        case 2:
            intcode[resultAddress] = a * b;
            break;
        default:
            throw "invalid intcode operation.";
            break;
    }

    return true;
}

(() => {
    let intcode = getIntcode();
    let originalIntcode = [...intcode];
    executeIntcode(intcode);
    console.log(`Solution Part 1: ${ intcode[0] }`);
})();
