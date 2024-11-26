import { 
  randomStr, 
  randomListStr, 
  chooseFromArray, 
  chooseManyFromArray 
} from './util.js';

import randomInteger from 'random-int';

import { File, statuses } from './make_file.js'

export class Kategorya {
  constructor() {
    this.pangalan = undefined;
    this.ngo = undefined;
    this.lgu = undefined;
  }
}

export class Child {
  constructor() {
    /** @type {string} */
    this.program = undefined; 

    /** @type {Date} */
    this.date = undefined;
    
    /** @type {number} */
    this.caseNo = undefined;
    
    /** @type {string} */
    this.pangalan = undefined;
    
    /** @type {number} */
    this.edad = undefined;
    
    /** @type {string} */
    this.birthday = undefined;
    
    /** @type {string} */
    this.relihiyon = undefined;
    
    /** @type {string} */
    this.antasNgPaaralan = undefined;
    
    /** @type {string} */
    this.palayaw = undefined;
    
    /** @type {string} */
    this.kasarian = undefined;
    
    /** @type {string} */
    this.lugarNgKapanganakan = undefined;
    
    /** @type {string} */
    this.hulingPaaralangPinasukan = undefined;
    
    /** @type {string} */
    this.tirahan = undefined;
    
    /** @type {string[]} */
    this.problema = undefined;
    
    /** @type {string} */
    this.allergy = undefined;
    
    /** @type {string[]} */
    this.dokumento = undefined;
    
    /** @type {string} */
    this.vaccine = undefined;
    
    /** @type {string[]} */
    this.initialNaItsura = undefined;
    
    /** @type {Kategorya} */
    this.kategorya = undefined;
    
    /** @type {string} */
    this.nanay = undefined;
    
    /** @type {string} */
    this.tatay = undefined;
    
    /** @type {string[]} */
    this.kapatid = undefined;
    
    /** @type {number} */
    this.yearAdmitted = undefined;
    
    /** @type {string} */
    this.picture = "";
    
    /** @type {string} */
    this.status = "Active";
    
    /** @type {string[]} */
    this.goalsAchieved = undefined;
    
    /* @type {string[]} */
    this.subgoals = undefined;

    /* @type {File[]} */
    this.attachedFiles = undefined;
  }
}

export const antasList = [
  "None",
  "Elementary",
  "High School",
  "College",
  "ALS"
];

export const programList = [
  "home care",
  "Community Based Program"
];

export const featureList = [
  "Madumi at punit na damit",
  "May sugat/galis sa katawan",
  "Payat na pangangatawan",
  "Maduming kuko",
  "Magulong buhok",
  "Malaki ang tiyan",
  "May sirang ngipin",
  "Nakayapak/walang tsinelas",
  "May hindi magandang amoy",
];

export const kategoryaList = [
  "Kusang Lumapit",
  "Naisama sa Survey",
  "Referral",
]

export const problemList = [
  "Abandoned",
  "Neglected",
  "Ran away from home",
  "Gang involvement",
  "Suffered physical abuse",
  "Suffered sexual abuse",
  "Roaming in the street",
  "Sleeping on the street",
  "Hygiene",
  "School drop-out",
  "Academic problem",
  "Not studying",
];


export function piliAntas(edad) {
  let antas = antasList[0];

  if (edad > 11) {
    antas = antasList[2]; // High school
  }
  else if (edad > 4) {
    antas = antasList[1]; // Elementary
  }
  else {
    antas = antasList[0]; // None
  }

  return antas
}

/**
 * List of religions 
 * */
const listahangRelihiyon = [
    "Roman Catholic",
    "Christianity",
    "Born Again",
    "Iglesia ni Kristo",
    "Islam",
    "Buddhism"
  ]

/**
 * makeChild.
 *
 * @param {string} firstName - First name of the child
 * @param {string} lastName - Last name of the child
 * @param {string} kasarian - Gender of the child
 */
export function makeChild(firstName, lastName, kasarian) {
  const child = new Child();
  const today = new Date();
  /**
   * @type {string}
   */
  const fullName = firstName + lastName;

  child.program = programList.at(randomInteger(1)); 
  child.date = today;
  // child.caseNo = ; //unique id
  child.pangalan = fullName;
  child.edad = randomInteger(1, 12);
  child.birthday = 
    (today.getUTCFullYear() - child.edad).toString()
    + randomInteger(1, 12).toString()
    + randomInteger(1, 25); //petsa ng kapanganakan

  child.relihiyon = listahangRelihiyon.at(randomInteger(5));

  child.antasNgPaaralan = piliAntas(child.edad);
  child.palayaw = firstName.split(' ')[0];
  child.kasarian = kasarian;
  child.lugarNgKapanganakan = randomStr();
  child.hulingPaaralangPinasukan = randomStr(); //huling paaralang pinasukan
  child.tirahan = randomStr(); //area
  child.problema = chooseManyFromArray(problemList);
  child.dokumento = randomListStr();
  child.initialNaItsura = chooseManyFromArray(featureList);

  child.kategorya = {};
  child.kategorya.pangalan = chooseFromArray(kategoryaList);

  if (child.kategorya.pangalan == kategoryaList[2]) { // referral
    child.kategorya.ngo = randomStr();
    child.kategorya.lgu = randomStr();
  }

  child.yearAdmitted = 2024;
  child.status = chooseFromArray(["Active", "Inactive"]);
  child.goalsAchieved = ["Goal1", "Goal2", "Goal3"] // : [{ type: String }],
  child.subgoals = ["Subgoal1", "Subgoal2", "Subgoal3"]

  child.attachedFiles = [
    new File(randomStr(), randomStr(), 0, chooseFromArray(statuses)),
    new File(randomStr(), randomStr(), 1, chooseFromArray(statuses)),
    new File(randomStr(), randomStr(), 2, chooseFromArray(statuses)),
    new File(randomStr(), randomStr(), 3, chooseFromArray(statuses)),
    new File(randomStr(), randomStr(), 4, chooseFromArray(statuses))
  ]

  return child; 
}


