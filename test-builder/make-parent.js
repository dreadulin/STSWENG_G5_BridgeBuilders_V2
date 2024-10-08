import randomInteger from "random-int";
import {antasList, Child} from "./make_children.js";
import {chooseFromArray, randomListStr, randomStr, writeBirthdayStr} from "./util.js";
import resultNames from './readFiles.js'

export class Parent {
  constructor() {
    /** @type {String} */
    this.pangalan = undefined;  

    /** @type { String } */
    this.palayaw = undefined;
    /** @type { String } */
    this.kasarian = undefined; //male or female
    /** @type { Number } */
    this.edad = undefined;
    /** @type { String } */
    this.birthday = undefined; //petsa ng kapanganakan
    /** @type { String } */
    this.lugarNgKapanganakan = undefined; //lugar ng kapanganakan
    /** @type { String } */
    this.relihiyon = undefined;
    /** @type { String } */
    this.antasNgPaaralan = undefined; //Kasalukuyan/Naabot na Antas ng Paaralan + list
    /** @type { String } */
    this.hulingPaaralangPinasukan = undefined; //huling paaralang pinasukan
    /** @type { String } */
    this.tirahan = undefined; //kasalukuyang tirahan (current address)
    /** @type { String } */
    this.probinsya = undefined;
    /** @type { String } */
    this.trabaho = undefined;
    /** @type { Number } */
    this.kita = undefined;
    /** @type { String } */
    this.skillTraining = undefined; //skill training attended
    /** @type { String } */
    this.skills = undefined;
    /** @type { String[] }*/
    this.dokumento = undefined;
  }
}

/**
 * @param {Child} child
 * @returns 
 * */
export function assignMother(child) {
  const parent_ = new Parent();
  const lastName = child.pangalan.split(' ').at(-1);
  const kasarian = chooseFromArray(["Lalaki", "Babae", "Other"]);
  let name = "";

  if (kasarian == "Lalaki") {
    name = resultNames.takeMaleName() + " " + lastName;
  }
  else if (kasarian == "Babae") {
    name = resultNames.takeFemaleName() + " " + lastName;
  }
  else if (kasarian == "Other") {
    name = 
      chooseFromArray([resultNames.takeMaleName(), 
                       resultNames.takeFemaleName()])
      + " " + lastName;
  }

  parent_.pangalan = name;
  parent_.palayaw = name.split(' ')[0];
  parent_.kasarian = kasarian;
  parent_.edad = randomInteger(24, 80);
  parent_.lugarNgKapanganakan = randomStr();

  parent_.birthday = writeBirthdayStr(parent_.edad);
  parent_.lugarNgKapanganakan = randomStr();
  parent_.relihiyon = randomStr();
  parent_.antasNgPaaralan = antasList[chooseFromArray([0, 3, 4])];
  parent_.hulingPaaralangPinasukan = randomStr();
  parent_.tirahan = child.tirahan;
  // parent_.probinsya = chooseFromArray([randomStr(), probinsya]);
  parent_.probinsya = randomStr();
  parent_.trabaho = randomStr();
  parent_.kita = randomInteger(10000, 600000);
  parent_.skillTraining = randomStr();
  parent_.skills = randomStr();
  parent_.dokumento = randomListStr();

  child.nanay = parent_.pangalan;
  return parent_;
}

export function assignFather(child) {
  const parent_ = new Parent();
  const lastName = child.pangalan.split(' ').at(-1);
  const kasarian = chooseFromArray(["Lalaki", "Babae", "Other"]);
  let name = "";

  if (kasarian == "Lalaki") {
    name = resultNames.takeMaleName() + " " + lastName;
  }
  else if (kasarian == "Babae") {
    name = resultNames.takeFemaleName() + " " + lastName;
  }
  else if (kasarian == "Other") {
    name = 
      chooseFromArray([resultNames.takeMaleName(), 
                       resultNames.takeFemaleName()])
      + " " + lastName;
  }

  parent_.pangalan = name;
  parent_.palayaw = name.split(' ')[0];
  parent_.kasarian = kasarian;
  parent_.edad = randomInteger(24, 80);
  parent_.lugarNgKapanganakan = randomStr();

  parent_.birthday = writeBirthdayStr(parent_.edad);
  parent_.lugarNgKapanganakan = randomStr();
  parent_.relihiyon = randomStr();
  parent_.antasNgPaaralan = antasList[chooseFromArray([0, 3, 4])];
  parent_.hulingPaaralangPinasukan = randomStr();
  parent_.tirahan = child.tirahan;
  parent_.probinsya = randomStr();
  parent_.trabaho = randomStr();
  parent_.kita = randomInteger(10000, 600000);
  parent_.skillTraining = randomStr();
  parent_.skills = randomStr();
  parent_.dokumento = randomListStr();

  child.tatay = parent_.pangalan;
  return parent_;
}
