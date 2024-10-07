import resultNames from './readFiles.js'
import randomInteger from 'random-int';
import { 
  makeChild,
} from './make_children.js';


import {assignFather, assignMother} from './make-parent.js';
import {chooseFromArray, makeFirstName} from './util.js';
import { assignSiblings } from './make-siblings.js';

/*
function generateName(kasarian) {
  let first = "";
  let last = "";
  
  if (kasarian == "Lalaki") {
    for (let i = 0; i < randomInteger(1, 2); i++)
      first += resultNames.takeMaleName();
  }
  if (kasarian == "Babae") {
    for (let i = 0; i < randomInteger(1, 2); i++)
      first += resultNames.takeFemaleName();
  }
  if (kasarian == "Other") {
    switch (randomInteger(1)) {
      case 0:
        for (let i = 0; i < randomInteger(1, 2); i++)
          first += resultNames.takeMaleName();
        break;
      case 1: 
        for (let i = 0; i < randomInteger(1, 2); i++)
          first += resultNames.takeFemaleName();
        break;
    }
  }


  return {first, last};
}
*/

// select how many children
const childCount = 5;
const children = [];
const today = new Date();

for (let i = 0; i < childCount; i++) {
  const kasarian = chooseFromArray(["Lalaki", "Babae", "Other"]);

  const firstName = makeFirstName(resultNames, kasarian);
  const lastName = resultNames.takeFamilyName();

  const child = makeChild(firstName, lastName, kasarian);

  assignFather(child);
  assignMother(child);
  assignSiblings(child, children);

  children.push(child);
}

console.log(children);
console.log(children.length);
// mongodb time

