import e from "express";
import randomInteger from "random-int";

export const randomStrLength = 10;

/**
 * randomStr.
 */
export function randomStr() {
  const length = randomStrLength;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  let result = '';
  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}

/**
 * randomListStr.
 * @returns {}
 */
export function randomListStr() {
  return Array.from({length: 5}, () => { return randomStr(); })
}

/**
 * chooseFromArray.
 *
 * @param {Array} array
 * @returns {any} an element of the array
 */
export function chooseFromArray(array) {
  return array[randomInteger(array.length - 1)];
}

/**
 * chooseManyFromArray.
 *
 * @param {} array
 * @param {} length
 */
export function chooseManyFromArray(array, length) {
  const newArray = [];
  for (let i = 0; i < length; i++) {
    if (randomInteger(1) == 1) {
      newArray.push(array[i]);
    }
  }

  return newArray;
}

/**
 * @param {number} age
 * @returns {Date}
 * */
export function writeBirthday(age) {
  const today = new Date();
  return new Date(
    today.getFullYear() - age,
    randomInteger(1, 12),
    randomInteger(1, 31)
  );
}

/**
 * writeBirthdayStr.
 *
 * @param {number} age
 * @returns {string}
 */
export function writeBirthdayStr(age) {
  /** @type {Date} */
  const date = writeBirthday(age)

  return date.getFullYear().toString()
    + '-' + date.getMonth().toString()
    + '-' + date.getDate().toString();
}

/**
 * @callback takeName
 * Either resultNames.takeMaleName or resultNames.takeFemaleName
 * @returns {string} name
 */

/**
 * makeFirstName.
 *
 * @param {takeName} takeName
 */
export function makeFirstName(resultNames, kasarian) {
  let name = "";
  let chosenName = "";

  for (let i = 0; i < randomInteger(1, 3); i++) {

    switch (kasarian) {
      case "Lalaki":
        chosenName = resultNames.takeMaleName();
        break;
      case "Babae":
        chosenName = resultNames.takeFemaleName();
        break;
      case "Other":
        chosenName = resultNames.takeEitherName();
        break;
    }
    name += chosenName + ' ';
  }

  return name;
}

/**
 * outputDocuments.
 *
 * @param {} cursor
 */
export async function outputDocuments(cursor) {
  console.log("Childrens: ");
  for await (const item of cursor) {
    console.log(item);
  } 
}

/**
 * generateRangeOfYearFromToday.
 *
 * @param {number} upper bound of the range (must be positive)
 * @param {number} lower bound of the range (must be positive)
 * @returns {number[]} an array that is a range of years:  
 * [n - lower, n, n + upper] where n is current year.
 */
export function generateRangeOfYearFromToday(upper, lower) {
  const today = new Date();
  const rangeOfYear = [];

  // clean out the negatives
  upper = Math.abs(upper);
  lower = Math.abs(lower);

  while (upper > 0) {
    const thisYear = today.getFullYear();
    const year = thisYear + upper;

    rangeOfYear.push(year);
    
    upper -= 1;
  }

  rangeOfYear.push(today.getFullYear());

  while (lower > 0) {
    const thisYear = today.getFullYear();
    const year = thisYear - lower;

    rangeOfYear.push(year);
    
    lower -= 1;
  }
  return rangeOfYear;
}

export function generateRangeOfYear(oldestYear) {
  const today = new Date();
  const thisYear = today.getFullYear();
  const rangeOfYear = [];
  
  while (oldestYear < thisYear) {
    rangeOfYear.push(oldestYear);
    oldestYear += 1;
  }

  rangeOfYear.push(thisYear);
  console.log("rangeOfYear:", rangeOfYear)

  return rangeOfYear;
}
