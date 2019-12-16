import { readFile } from './lib/fileIO';
import { occurences } from './lib/util';

/**
 * Reads pixels from file and places them into layers.
 * @param {string} filepath the puzzle file.
 * @param {int} width the width of each layer.
 * @param {int} height the height of each layer.
 */
const getLayers = (filepath, width, height) => {
    let pixels = [];
    let layers = [];
    readFile(filepath).split('').forEach(pixel => {
        pixels.push(parseInt(pixel));
    });
    for (let i = 0; i < (pixels.length / (width * height)); i++) {
        let layer = pixels.slice(i * (width * height), (i + 1) * (width * height));
        layers.push(layer);
    }
    return layers;
};

/**
 * Finds the index of the layer with the least amount of occurences of a value.
 * @param {Array.<Array.<int>>} layers the layers to search.
 * @param {int} value the value to serach for.
 * @return {int} the index of the layer with the minimum occurence.
 */
const findMinOccurence = (layers, value) => {
    let layerIndex = 0;
    let minCount = occurences(layers[0], value);
    for (let i = 1; i < layers.length; i++) {
        let count = occurences(layers[i], value);
        if (count < minCount) {
            minCount = count;
            layerIndex = i;
        }
    }
    return layerIndex;
};

/**
 * Identifies the first non-transparent pixel in each layer and composes a new layer.
 * @param {Array.<Array.<int>>} layers the layers. 
 * @param {int} width the width of each layer.
 * @param {int} height the height of each layer.
 * @return {Array.<char>} an array that can be output to the console.
 */
const createVisibleLayer = (layers, width, height) => {
    let layer = [];
    for (let i = 0; i < (width * height); i++) {
        for (let j = 0; j < layers.length; j++) {
            if (layers[j][i] !== 2) {
                layer.push(layers[j][i] === 0 ? ' ' : 'X');
                break;
            }
        }
    }
    return layer;
};

(() => {
    let width = 25;
    let height = 6;
    let layers = getLayers('./puzzle_input/day08_input.txt', width, height);
    let targetLayer = layers[findMinOccurence(layers, 0)];
    let validation = occurences(targetLayer, 1) * occurences(targetLayer, 2);
    console.log(`Part 1 Solution: ${validation}`);
    let visibleLayer = createVisibleLayer(layers, width, height);
    console.log('Part 2 Solution:');
    for (let i = 0; i < height; i++) {
        let row = visibleLayer.slice(i * width, (i + 1) * width).join(' ');
        console.log(row);
    }
})();   