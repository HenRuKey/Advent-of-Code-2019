import { readStringsFromFile } from './lib/fileIO';

const Orbit = class {

    constructor(name, parent=undefined) {
        this.name = name;
        this.parent = parent;
        this.depth = 0;
    };

    /**
     * Sets the depth of all the orbit's descendents based on its own depth.
     * @param {Array.<Orbit>} orbitTree the tree to which the orbit belongs. 
     */
    addDepthToChildren(orbitTree) {
        this.depth = this.parent ? this.parent.depth + 1 : 0;
        let children = orbitTree.filter(orbit => {
            return orbit.parent === this;
        });
        children.forEach(child => {
            child.addDepthToChildren(orbitTree);
        });
    }

    /**
     * The parent node and all its parents up until the origin node.
     * @return {Array.<Orbit>} the orbit's parents.
     */
    getParents() {
        let parents = [];
        let nextParent = this.parent;
        while (nextParent) {
            parents.push(nextParent);
            nextParent = nextParent.parent;
        }
        return parents;
    }

}

/**
 * Identifies the node in a tree by a given name.
 * @param {string} name the name to search for.
 * @param {Array.<Orbit>} orbitTree the tree containing the orbit.
 * @return {Orbit} the orbit matching the given name.
 */
const orbitByName = (name, orbitTree) => {
    return orbitTree.filter(orbit => {
        return name === orbit.name;
    })[0];
};

/**
 * Create an array of Orbits that contain their parent and depth.
 * @param {Array.<string>} orbits a list of orbit definitions.
 * @return {Array.<Orbit>} the array of Orbit objects.
 */
const createOrbitTree = (orbits) => {
    let origin = new Orbit('COM');
    let orbitTree = [origin];
    // Place all nodes in tree.
    orbits.forEach(orbit => {
        let parsedOrbit = orbit.split(')');
        let parent = parsedOrbit[0];
        let child = new Orbit(parsedOrbit[1], parent);
        orbitTree.push(child);
    });
    // Add reference to parent to each node.
    orbitTree.forEach(orbit => {
        orbit.parent = orbitTree.filter(o => {
            return orbit.parent === o.name;
        })[0];
    });
    // Add depth to all nodes.
    origin.addDepthToChildren(orbitTree);
    return orbitTree;
};

/**
 * Determines the number of direct and indirect orbits in the tree.
 * @param {Array.<Orbit>} orbitTree the array of Orbits.
 * @return {int} the total number of direct and indirect orbits.
 */
const numOfOrbits = (orbitTree) => {
    let total = 0;
    orbitTree.forEach(orbit => {
        total += orbit.depth;
    });
    return total;
};

/**
 * 
 * @param {*} orbit1 
 * @param {*} orbit2 
 */
const orbitsBetween = (orbit1, orbit2) => {
    let orbit1Parents = orbit1.getParents();
    let orbit2Parents = orbit2.getParents();
    let commonParent;
    let commonParentDepth;
    for (commonParentDepth = 0; commonParentDepth < orbit1Parents.length; commonParentDepth++) {
        if (orbit2Parents.includes(orbit1Parents[commonParentDepth])) {
            commonParent = orbit1Parents[commonParentDepth];
            break;
        }
    }
    return (orbit2.depth - commonParent.depth) + commonParentDepth - 1;
};

(() => {
    let orbits = readStringsFromFile('./puzzle_input/day06_input.txt');
    let orbitTree = createOrbitTree(orbits);
    let totalOrbits = numOfOrbits(orbitTree);
    console.log(`Part 1 Solution: ${totalOrbits} total orbits`);
    let you = orbitByName('YOU', orbitTree);
    let santa = orbitByName('SAN', orbitTree);
    let distance = orbitsBetween(you, santa);
    console.log(`Part 2 Solution: ${ distance } orbits between you and Santa`);
})();