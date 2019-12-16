
/**
 * Finds all possible combinations of the given array, where order matters and values don't repeat.
 * @param {Array.<any>} values the values.
 * @return {Array.<Array.<any>>} all combinations of the values.
 */
export const getAllCombinations = (values) => {
    values = [...new Set(values)];
    let combinations = [];
    const getCombination = (items, combination) => {
        if (items.length === 0) {
            combinations.push([...combination]);
            return;
        }
        for (let i = 0; i < items.length; i++) {
            combination.push(items[i]);
            let remainingItems = [...items.slice(0, i), ...items.slice(i + 1)];
            getCombination(remainingItems, combination);
            combination.pop();
        }
    };
    getCombination(values, []);
    return combinations;
};

/**
 * Finds the number of occurences of a value in an array.
 * @param {Array.<any>} arr the array to search.
 * @param {any} value the value to search for.
 * @return {int} the number of occurences of the value in the array.
 */
export const occurences = (arr, value) => {
    let count = 0;
    arr.forEach(item => {
        if (item === value) {
            count++;
        }
    });
    return count;
};