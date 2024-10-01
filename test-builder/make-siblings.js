import randomInteger from "random-int";
import {Child} from "./make_children";
import {chooseFromArray} from "./util";

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
 * assignSiblings.
 *
 * @param {Child} child
 * @param {Child[]} children
 */
export function assignSiblings(child) {
  const bilangNgKapatid = randomInteger(0, 4);
  const lastName = child.pangalan(' ').at(-1);

  let kasarian = chooseFromArray(["Lalaki", "Babae", "Other"]);

  for (let i = 0; i < bilangNgKapatid; i++) {
    const kapatid = new Sibling()
    kapatid.pangalan = lastName; 

    child.kapatid.push();
  }
}
