
/**
 * Adds a noun and verb to indices 1 and 2 respectively.
 * @param {int} noun 
 * @param {int} verb 
 * @param {Array.<int>} intcode the intcode to modify. 
 * @note The given intcode array isn't modified. Instead, a copy is made.
 * @return {Array.<int>} the modified intcode.
 */
export const applyNounVerb = (noun, verb, intcode) => {
    let code = [...intcode];
    code[1] = noun;
    code[2] = verb;
    return code;
};

/**
 * Executes a given array of intcode.
 * @param {Array.<int>} intcode the intcode to execute.
 */
export const executeIntcode = (intcode) => {
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
const readIntcodeSegment = (intcodeSegment, intcode) => {
    let operation = intcodeSegment[0];

    if (operation == 99) { return false; }

    let a = intcode[intcodeSegment[1]];
    let b = intcode[intcodeSegment[2]];
    let resultAddress = intcodeSegment[3];

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
};

/**
 * Finds the combination of noun and verb needed to find the target at index 0 after the intcode is executed.
 * @param {int} target the desired value at index 0 after the intcode is executed. 
 * @param {Array.<int>} intcode the intcode to execute.
 * @return {int} 100 * noun + verb, where the noun and verb will acheive the given target.
 */
export const findNounVerb = (target, intcode) => {
    let solutionFound = false;
    let solution;
    for (let noun = 0; noun < 99; noun++) {
        for (let verb = 0; verb < 99; verb++) {
            let modifiedIntcode = applyNounVerb(noun, verb, intcode);
            executeIntcode(modifiedIntcode);
            if (modifiedIntcode[0] == target) {
                solution = 100 * noun + verb;
                solutionFound = true;
                break;
            }
        }
        if (solutionFound) { break; }
    }
    return solution;
}