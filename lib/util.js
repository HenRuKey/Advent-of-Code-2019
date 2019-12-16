
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
}