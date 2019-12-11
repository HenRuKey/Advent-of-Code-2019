import { readCollectionsFromFile } from './lib/fileIO';

class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    /**
     * Finds all the points on a straight line between two points.
     * @param {Point} other the second point.
     * @return {Array.<Point>} the points between this point and the other.
     */
    pointsBetween(other) {
        if (!other instanceof Point) { // Validates the datatype of other.
            throw "other must be of type Point";
        }
        if (other.x !== this.x && other.y !== this.y) { // Guarantees other point is on the same line as this point.
            throw "points must be on either the same vertical or horizontal line";
        }
        const valuesBetween = (val1, val2) => {
            let values = [];
            if (val1 == val2) { return values; }
            if (val1 > val2) {
                for (let i = val2 + 1; i < val1; i++) {
                    values.push(i);
                }
            }
            else {
                for (let i = val2 - 1; i > val1; i--) {
                    values.push(i);
                }
            }
            return values;
        }
        let xDiff = valuesBetween(this.x, other.x);
        if (xDiff.length == 0) {
            let yDiff = valuesBetween(this.y, other.y);
            return yDiff.map(yVal => {
                return new Point(this.x, yVal);
            });
        }
        else {
            return xDiff.map(xVal => {
                return new Point(xVal, this.y);
            });
        }
    }

    /**
     * Determines if the point exists within a given wire.
     * @param {Array.<Point>} wire the wire to search.
     * @return {boolean} true if the point exists in the wire.
     */
    inWire(wire) {
        let matchFound = false;
        for (let i = 0; i < wire.length; i++) {
            let point = wire[i];
            if (point.x == this.x && point.y == this.y) {
                matchFound = true;
                break;
            }
        }
        return matchFound;
    }

}

/**
 * Retrieves the instructions from the given filepath and parses it into arrays of points.
 * @param {string} filepath the path to the file.
 * @return {Array.<Array.<Point>>} the parsed content of the file. 
 */
const getWires = (filepath) => {
    let fileContents = readCollectionsFromFile(filepath, undefined, ",");
    let wires = [];
    fileContents.forEach(collection => {
        wires.push(extractPoints(collection));
    });
    return wires;
};

/**
 * Creates point objects based on a string description of its location.
 * @param {Array.<string>} wireDefinition the unparsed collection of wire direction + distance pairs.
 * @return {Array.<Point>} the points extracted from the given wire description.
 */
const extractPoints = (wireDefinition) => {
    let lastPoint = new Point(0, 0);
    let points = [];
    for (let i = 0; i < wireDefinition.length; i++) {
        let definition = wireDefinition[i];
        let direction = definition[0];
        let distance = parseInt(definition.slice(1));
        let x = lastPoint.x;
        let y = lastPoint.y;
        switch (direction) {
            case 'U':
                y += distance;
                break;
            case 'D':
                y -= distance;
                break;
            case 'R': 
                x += distance;
                break;
            case 'L': 
                x -= distance;
                break;
            default:
                throw `Invalid direction ${direction}`;
        }
        let newPoint = new Point(x, y);
        points.push(...newPoint.pointsBetween(lastPoint));
        points.push(newPoint);
        lastPoint = newPoint;
    }
    return points;
};

/**
 * Finds all the intersecting points between two wires.
 * @param {Array.<Array.<Point>>} wires the two wires.
 * @return {Array.<Point>} the points that intersect.
 */
const findIntersections = (wires) => {
    return wires[0].filter(point => {
        return point.inWire(wires[1]);
    });
};

/**
 * Finds the minimum distance from the given intersections and the origin point (0, 0).
 * @param {Array.<Point>} intersections the intersecting points.
 * @return {int} the minimum distance from an intersection to the origin point.
 */
const findMinDistance = (intersections) => {
    let distances = intersections.map(intersection => {
        return Math.abs(intersection.x) + Math.abs(intersection.y);
    });
    let min = distances[0];
    distances.forEach(distance => {
        if (distance < min) {
            min = distance;
        }
    });
    return min;
};

/**
 * Finds the shortest distance both wires need to travel to reach an intersection.
 * @param {Array.<Point>} intersections the points that intersect.
 * @param {Array.<Array.<Point>>} wires the two wires.
 * @return {int} the minimum distance traveled on both wires to reach one of the given intersections.
 */
const findMinWireDistance = (intersections, wires) => {
    let distances = intersections.map(intersection => {
        let wire1Distance = wires[0].findIndex(point => point.x == intersection.x && point.y == intersection.y);
        let wire2Distance = wires[1].findIndex(point => point.x == intersection.x && point.y == intersection.y);
        return wire1Distance + wire2Distance + 2;
    });
    let min = distances[0];
    distances.forEach(distance => {
        if (distance < min) {
            min = distance;
        }
    });
    return min;
};

(() => {
    let wires = getWires('./puzzle_input/day03_input.txt');
    let intersections = findIntersections(wires);
    let distance = findMinDistance(intersections);
    console.log(`Part 1 Solution: ${ distance }`);
    let wireDistance = findMinWireDistance(intersections, wires);
    console.log(`Part 2 Solution: ${ wireDistance }`);
})();