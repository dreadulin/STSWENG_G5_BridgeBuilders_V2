import {readFileSync} from 'node:fs';
import {randomInteger} from 'random-int';

const resultNames = {
  maleNames: [],
  femaleNames: [],
  familyNames: [],
  takeMaleName: function (){
    const idx = randomInteger(this.maleNames.length);
    const name = this.maleNames[idx];
    // this.maleNames.splice(idx, 1);

    return name;
  },
  takeFemaleName: function (){
    const idx = randomInteger(this.femaleNames.length);
    const name = this.femaleNames[idx];
    // this.femaleNames.splice(idx, 1);

    return name;
  },
  takeEitherName: function () {
    
  };
  takeFamilyName: function (){
    const idx = randomInteger(this.familyNames.length);
    const name = this.familyNames[idx];
    this.familyNames.splice(idx, 1);

    return name;
  }
};

const takeFirst = value => {
  const firstAndLast = value.split(' ');
  const firstName = firstAndLast[0];
  return firstName;
};

const takeSecond = value => {
  const firstAndLast = value.split(' ');
  const firstName = firstAndLast[1];
  return firstName;
};

try {
  const maleData = readFileSync("male_names.txt", "utf8", "r");
  const femaleData = readFileSync("female_names.txt", "utf8", "r");

  const maleNamesData = maleData.split('\n').filter(Boolean);
  const femaleNamesData = femaleData.split('\n').filter(Boolean);

  const maleFirstNames = maleNamesData.map(takeFirst);

  const femaleFirstNames = femaleNamesData.map(takeFirst);

  const lastNames = maleNamesData.map(takeSecond);

  lastNames.push(...femaleNames.map(takeSecond));

  resultNames.maleNames.push(...maleFirstNames);
  resultNames.femaleNames.push(...femaleFirstNames);
  resultNames.familyNames.push(...lastNames);

} catch (err) {
  throw err;
}

export default resultNames;
