import { readIntsFromFile } from './lib/fileIO'
import { applyNounVerb, executeIntcode, findNounVerb } from './lib/intcode';

/**
 * Retrieves intcode instruction from puzzle input file.
 * @return {Array.<int>} the intcode read from the puzze input file.
 */
const getIntcode = () => {
    return readIntsFromFile('./puzzle_input/day02_input.txt', ',');
};


(() => {
    let intcode = getIntcode();
    let originalIntcode = [...intcode]; // Create a copy of the original intcode.  
    
    intcode = applyNounVerb(12, 2, intcode);
    executeIntcode(intcode);
    console.log(`Solution Part 1: ${ intcode[0] }`);

    let solution = findNounVerb(19690720, originalIntcode);
    console.log(`Solution Part 2: ${ solution }`);
})();
