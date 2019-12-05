
var fs = require('fs');

/**
 * 
 * @param {String} filepath 
 */
export function readIntsFromFile(filepath) {
    let fileContents = fs.readFileSync(filepath, 'utf8');
    let numbers = []
    fileContents.split("\n").forEach(num => {
        numbers.push(parseInt(num));
    });
    return numbers;
}
