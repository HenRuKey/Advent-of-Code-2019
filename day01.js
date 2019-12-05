import { readIntsFromFile } from './fileIO';

/**
 * Calculates the amount of fuel required for the given mass.
 * @param {int} mass the mass of the object.
 * @return {int} the amount of fuel required.
 */
let fuelByMass = (mass) => {
    let roundedDown = mass - (mass % 3);
    return (roundedDown / 3) - 2;
};

/**
 * Calculates the total amount of fuel required for a collection of masses.
 * @param {Array.<int>} masses the masses.
 * @return {int} the total amount of fuel required.
 */
let totalFuel = (masses) => {
    let fuel = 0;
    for (let i = 0; i < masses.length; i++) {
        fuel += fuelByMass(masses[i]);
    }
    return fuel;
}

/**
 * Calculates the total fuel required for a collection of masses, considering the mass of the fuel itself.
 * @param {Array.<int>} masses the masses.
 * @return {int} the total amount of fuel required.
 */
let fuelByFuel = (masses) => {
    let fuel = 0;
    for (let i = 0; i < masses.length; i++) {
        let remainingFuel = masses[i];
        while ((remainingFuel = fuelByMass(remainingFuel)) > 0) {
            fuel += remainingFuel;
        }
    }
    return fuel;
}

(() => {
    let numbers = readIntsFromFile('./puzzle_input/day01_input.txt');
    let fuel = totalFuel(numbers);
    console.log(`Part 1 Solution: ${ fuel }`);
    let fuel2 = fuelByFuel(numbers);
    console.log(`Part 2 Solution: ${ fuel2 }`);
})();