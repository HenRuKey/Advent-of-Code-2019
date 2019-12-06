let increaseTest = (num) => {
    let snum = JSON.stringify(num);
    for (let i = 0; i < snum.length; i++) {
        let numBase = parseInt(snum[i]);
        let seg = snum.slice(i+1);
        let numSeg = parseInt(seg);
        if (numSeg < numBase * (10 ** (seg.length - 1))) {
            return false;
        }
    }
    return true;
};

let repeatTest = (num) => {
    let snum = JSON.stringify(num);
    let repeatFound = false;
    for (let i = 0; i < snum.length - 1; i++) {
        if (snum[i] == snum[i + 1]) {
            repeatFound = true;
            break;
        }
    }
    return repeatFound;
}

let findPossibleValues = (min, max) => {
    let possibleValues = [];
    for (let i = min; i < max; i++) {
        if (increaseTest(i) && repeatTest(i)) {
            possibleValues.push(i);
        }
    }
    return possibleValues;
}

(() => {
    let minValue = 138307;
    let maxValue = 654504;
    let possibleValues = findPossibleValues(minValue, maxValue);
    console.log(`Problem 1 Solution: ${ possibleValues.length }`);
})();