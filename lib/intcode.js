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
 * Formats the opcode as a string with leading zeroes.
 * @param {int} opcode the opcode to format.
 * @return {string} the formatted opcode.
 */
const formatOpcode = (opcode) => {
    let strOpcode = JSON.stringify(opcode);
    while (strOpcode.length < 5) {
        strOpcode = "0" + strOpcode;
    }
    return strOpcode;
}

/**
 * Executes the intcode instruction at the given index.
 * @param {Array.<int>} intcode the intcode to run.
 * @param {int} currentIndex the location of the next operation in the intcode. 
 * @param {int} input the input used by operation 3.
 * @return {int} the updated index.
 */
const performOperation = (intcode, currentIndex, input) => {
    if (intcode[currentIndex] === 99) {
        return -1;
    }
    let opcode = formatOpcode(intcode[currentIndex]);
    let operation = parseInt(opcode.slice(-2)); 
    let params;
    switch (operation) {
        case 1: case 2: // Addition and multiplication.
            mathOperation(operation, opcode, intcode, currentIndex);
            currentIndex += 4;
            break;
        case 3: // Places the input at the first param.
            let index = intcode[currentIndex + 1];
            intcode[index] = input;
            currentIndex += 2;
            break;
        case 4: // Outputs the first param.
            params = retrieveParams(opcode, 1, intcode, currentIndex);
            let output = params[0];
            if (output !== 0) {
                console.log(output);
            }
            currentIndex += 2;
            break;
        case 5: case 6: // Jumps to index based on the first params value.
            params = retrieveParams(opcode, 2, intcode, currentIndex);
            currentIndex = (params[0] !== 0 && operation === 5) || (params[0] === 0 && operation === 6) 
                ? params[1] : currentIndex + 3;
            break;
        case 7: case 8: // Stores a 1 or 0 in third param based on the first two params.
            params = retrieveParams(opcode, 3, intcode, currentIndex);
            let passesTest = ((operation === 7 && params[0] < params[1]) || (operation === 8 && params[0] === params[1]))
                ? 1 : 0;
            intcode[intcode[currentIndex + 3]] = passesTest;
            currentIndex += 4;
            break; 
        default:
            throw `Invalid operation ${operation} @ ${currentIndex}`;
            break;
    }
    return currentIndex;
};

/**
 * Retrieves the parameters for an operation based on each parameter's mode.
 * @param {string} opcode the opcode specifying each parameter's mode.
 * @param {int} numOfParams the number of parameters to retrieve.
 * @param {Array.<int>} intcode the intcode instruction where the parameters are located.
 * @param {int} currentIndex the location of the current operation to which the parameters belong.
 * @return {Array.<int>} the parameters retrieved from the intcode.
 */
const retrieveParams = (opcode, numOfParams, intcode, currentIndex) => {
    let params = [];
    for (let i = 0; i < numOfParams; i++) {
        let opIndex = 0 - (i + 3);
        let mode = parseInt(opcode.slice(opIndex, opIndex + 1));
        let index = currentIndex + i + 1;
        let param = mode === 0 ? intcode[intcode[index]] : intcode[index];
        params.push(param);
    }
    return params;
}

/**
 * Performs a math operation using the intcode instructions.
 * @param {int} operation the operation to perform: 0 for addition, 1 for multiplication.
 * @param {string} opcode the instruction's opcode. 
 * @param {Array.<int>} intcode the intcode to which this operation belongs.
 * @param {int} currentIndex the index location of the current operation.
 */
const mathOperation = (operation, opcode, intcode, currentIndex) => {
    let params = retrieveParams(opcode, 2, intcode, currentIndex);
    let result = operation === 1 ? params[0] + params[1] : params[0] * params[1];
    intcode[intcode[currentIndex + 3]] = result;
};

/**
 * Executes a given array of intcode.
 * @param {Array.<int>} intcode the intcode to execute.
 */
export const executeIntcode = (intcode, input=1) => {
    let currentIndex = 0;
    do {
        currentIndex = performOperation(intcode, currentIndex, input);
    } while (currentIndex >= 0);
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