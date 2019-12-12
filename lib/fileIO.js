
var fs = require('fs');

/**
 * Takes a string containing ints split by a delimiter and puts the ints into an array.
 * @param {string} colleciton the string containing the ints.
 * @param {string} delimiter the delimiter dividing the ints.
 * @return {Array.<int>} the ints extracted from the string.
 */
let extractInts = (colleciton, delimiter) => {
    let numbers = [];
    colleciton.split(delimiter).forEach(num => {
        numbers.push(parseInt(num));
    });
    return numbers;
};

/**
 * Takes a string containing items split by a delimiter and puts the items into an array.
 * @param {string} collection the string to split.
 * @param {string} delimiter the delimiter dividing the items.
 * @return {Array.<string>} the items of the collection as an array.
 */
let extractValues = (collection, delimiter) => {
    let values = [];
    collection.split(delimiter).forEach(value => {
        values.push(value.replace('\r', ''));
    }); 
    return values;
}

/**
 * Reads the contents of a given file.
 * @param {string} filepath the path to the file.
 * @return {stirng} the contents of the file.
 */
let readFile = (filepath) => {
    return fs.readFileSync(filepath, 'utf8');
};

/**
 * Reads a collection of ints from a given file.
 * @param {String} filepath the path to the file.
 * @param {String} [delimiter="\n"] optional delimiter.
 * @return {Array.<int>} the ints in the file.
 */
export function readIntsFromFile(filepath, delimiter = "\n") {
    let fileContents = readFile(filepath);
    return extractInts(fileContents, delimiter);
}

/**
 * Reads a collection of strings from a given file.
 * @param {String} filepath the path to the file.
 * @param {String} [delimiter="\n"] optional delimiter.
 * @return {Array.<String>} the strings in the file.
 */
export function readStringsFromFile(filepath, delimiter = "\n") {
    let fileContents = readFile(filepath);
    return extractValues(fileContents, delimiter);
}

/**
 * Reads collections from a given filepath.
 * @param {string} filepath the path to the file.
 * @param {string} [collectionDelimiter="\n"] optional delimiter that splits the collections.
 * @param {string} [delimiter="\n"] optional delimiter that splits the items within the collection.
 * @return {Array.<Array.<string>>} the collections read from the file.
 */
export function readCollectionsFromFile(filepath, collectionDelimiter  = "\n", delimiter = "\n") {
    let fileContents = readFile(filepath);
    let collections = [];
    fileContents.split(collectionDelimiter).forEach(collection => {
        collections.push(extractValues(collection, delimiter));
    });
    return collections;
}