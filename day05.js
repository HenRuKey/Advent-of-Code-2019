import { readIntsFromFile } from './lib/fileIO'
import { executeIntcode } from './lib/intcode'

const getIntcode = () => {
    return readIntsFromFile('./puzzle_input/day05_input.txt', ',');
}

(() => {
    let intcode = getIntcode();
    console.log("Part 1 Solution:");
    executeIntcode(intcode);
    intcode = getIntcode();
    console.log("Part 2 Solution:");
    executeIntcode(intcode, 5);
})();