import randomInteger from "random-int";
import { Child, antasList, piliAntas} from "./make_children.js";
import {chooseFromArray, makeFirstName, randomStr} from "./util.js";
import resultNames from "./readFiles.js";

class Sibling {
  constructor(idx) {
    /** @type { Number } */
    this.kapatidIndex = idx;

    /** @type { String } */
    this.pangalan = undefined;
    
    /** @type { String } */
    this.kasarian = undefined; //male or female

    /** @type { Number } */
    this.edad = undefined;

    /** @type { String } */
    this.antasNgPaaralan = undefined; //antas ng edukasyon + list

    /** @type { String } */
    this.trabaho = undefined;

    /** @type { Number } */
    this.kita = undefined;
  }
}

/**
 * kuhaKita.
 * Depende sa age. Kita per month.
 * 5-18: 1000 >= kita >= 5000
 * 19...: 19350 >= kita >= 166000
 *
 * @param {number} edad
 */
export function kuhaKita(edad) {
  let kita = 0;

  if (edad >= 5 || edad <= 18) {
    kita = chooseFromArray([1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]);
  }
  else if (edad >= 19) {
    kita = randomInteger(19350, 166000);
  }

  return kita;
}

/**
 * kuhaEdad.
 *
 * @param {Child} child
 * @param {number} edadRange
 * @returns 0 kung lumampas, o child.edad +/- edadRange
 */
export function kuhaEdad(child, edadRange) {
  return Math.min(randomInteger(child.edad - edadRange, child.edad + edadRange));
}

/**
 * assignSiblings.
 *
 * @param {Child} child
 * @param {Child[]} children
 */
export function assignSiblings(child) {
  const bilangNgKapatid = randomInteger(0, 4);
  const lastName = child.pangalan.split(' ').at(-1);
  const mgaKapatid = [];
  let firstName = "";
  child.kapatid = [];

  let kasarian = chooseFromArray(["Lalaki", "Babae", "Other"]);

  for (let i = 0; i < bilangNgKapatid; i++) {
    const kapatid = new Sibling();
    const edadRange = randomInteger(1, 10);

    firstName = makeFirstName(resultNames, kasarian);

    kapatid.pangalan = firstName + lastName; 
    kapatid.kasarian = kasarian;
    kapatid.kapatidIndex = i;

    kapatid.edad = kuhaEdad(child, edadRange);
    kapatid.antasNgPaaralan = piliAntas(kapatid.edad);
    kapatid.kita = kuhaKita(kapatid.edad);
    kapatid.trabaho = randomStr();


    mgaKapatid.push(kapatid)
    child.kapatid.push(kapatid.pangalan);
    kasarian = chooseFromArray(["Lalaki", "Babae", "Other"]);
  }

  return mgaKapatid;
}
