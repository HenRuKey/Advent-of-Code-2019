
var fs = require('fs');

/**
 * Reads a collection of ints from a given file.
 * @param {String} filepath the path to the file.
 * @param {String} [delimiter="\n"] optional delimiter.
 * @return {Array.<int>} the ints in the file.
 */
export function readIntsFromFile(filepath, delimiter) {
    let delimiter = delimiter || "\n"; // Define the delimiter if it's not supplied.
    let fileContents = fs.readFileSync(filepath, 'utf8');
    let numbers = []
    fileContents.split(delimiter).forEach(num => {
        numbers.push(parseInt(num));
    });
    return numbers;
}
