import Intcode from './lib/intcode';
import { getAllCombinations } from './lib/util';
import { readIntsFromFile } from './lib/fileIO'


const testCombination = (combination, intcode) => {
    let input1;
    let input2 = 0;
    let code;
    for (let i = 0; i < combination.length; i++) {
        input1 = combination[i];
        code = new Intcode(intcode, [input1, input2], false);
        code.executeIntcode();
        input2 = code.output;
    }
    return code.output;
};

let findMaxOutput = (combinations) => {
    let intcode = readIntsFromFile('./puzzle_input/day07_input.txt', ',');
    let max = 0;
    combinations.forEach(combination => {
        let output = testCombination(combination, [...intcode]);
        if (output > max) {
            max = output;
        }
    });
    return max;
}


(() => {
    let combinations = getAllCombinations([0, 1, 2, 3, 4]);
    let maxCombo = findMaxOutput(combinations);
    console.log(maxCombo);
})();