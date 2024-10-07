import randomInteger from "random-int";

export const randomStrLength = 10;

export function randomStr() {
  const length = randomStrLength;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function randomListStr() {
  return Array.from({length: 5}, () => { return randomStr(); })
}

export function chooseFromArray(array) {
  return array[randomInteger(array.length - 1)];
}

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
