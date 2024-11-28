import resultNames from "./readFiles.js";

import { makeChild, makeChildProgram } from "./make_children.js";

import { assignFather, assignMother } from "./make-parent.js";
import { chooseFromArray, generateRangeOfYear as generateLowerYears, generateRangeOfYear, makeFirstName, outputDocuments } from "./util.js";
import { makeOneStat, makeStats } from "./make_stats.js";
import { assignSiblings } from "./make-siblings.js";

import dotenv from "dotenv";
import { makeUsers } from "./make-users.js";
import {makeFamilies} from "./make-family.js";

import mongoose from "mongoose"

import Child from "./schemas/ChildSchema.js";
import Parent from "./schemas/ParentSchema.js";
import Father from "./schemas/FatherSchema.js";
import Mother from "./schemas/MotherSchema.js";
import Family from "./schemas/FamilySchema.js";
import Sibling from "./schemas/SiblingSchema.js";
import Stats from "./schemas/StatSchema.js";
import User from "./schemas/UserSchema.js";

dotenv.config();

// options
const DELETE_DATA = parseInt(process.env.DELETE_DATA); // Delete data of children, families, parents, and siblings
const NUM_LABELS = parseInt(process.env.NUM_LABELS);
const NUM_FAMILIES = parseInt(process.env.NUM_FAMILIES);

// select how many children
const childCount = parseInt(process.env.CHILD_COUNT);
const children = [];
const parents = [];
const fathers = [];
const mothers = [];
const siblings = [];
const stats = [];

// const years = generateLowerYears(2018);
const years = generateRangeOfYear(2023, 2018);
let whichYear = 0;
let count = 0;
let maxCount = Math.round(childCount/years.length);

function generateChild(caseNo, hasGoal, hasSubgoal, programIdx, year, kasarian) {
  const result = {}

  const firstName = makeFirstName(resultNames, kasarian);
  const lastName = resultNames.takeFamilyName();

  result.child = makeChildProgram(programIdx, year, firstName, lastName, kasarian);
  result.child.caseNo = caseNo;

  result.father = assignFather(result.child);
  result.mother = assignMother(result.child);
  result.siblings = assignSiblings(result.child, children);
  result.stat = makeOneStat(result.child.yearAdmitted, NUM_LABELS);

  if (hasGoal) {
    result.child.goalsAchieved = ["Goal1","Goal2","Goal3"]; // : [{ type: String }],
  } else {
    result.child.goalsAchieved = []; // : [{ type: String }],
  }

  if (hasSubgoal) {
    result.child.subgoals = ["Subgoal1","Subgoal2","Subgoal3"]; // : [{ type: String }],
  } else {
    result.child.subgoals = []; // : [{ type: String }],
  }

  return result;
}

for (let i = 0; i < childCount; i++) {
  whichYear = Math.min(whichYear, years.length - 1);
  const kasarian = chooseFromArray(["Lalaki", "Babae", "Other"]);

  const firstName = makeFirstName(resultNames, kasarian);
  const lastName = resultNames.takeFamilyName();

  const child = makeChild(years[whichYear], firstName, lastName, kasarian);
  child.caseNo = 10 + i;

  const father = assignFather(child);
  const mother = assignMother(child);

  parents.push(father);
  parents.push(mother);

  fathers.push(father);
  mothers.push(mother);

  const siblingArray = assignSiblings(child, children);
  siblingArray.map((value) => {
    siblings.push(value);
  });

  const stat = makeOneStat(child.yearAdmitted, NUM_LABELS);

  stats.push(stat);

  children.push(child);

  if (count == maxCount) {
    whichYear += 1;
    count = 0;
  }
  count += 1;
}

const homeChild        = generateChild(555, true, false, 0, 2024, "Lalaki");
const commChild        = generateChild(556, true, false, 1, 2024, "Babae");
const homeSubGoalChild = generateChild(557, true, true,  0, 2024, "Lalaki");
const commSubGoalChild = generateChild(558, true, true,  1, 2024, "Babae");

children.push(homeChild.child, commChild.child,  homeSubGoalChild.child,  commSubGoalChild.child);
fathers.push(homeChild.father, commChild.father, homeSubGoalChild.father, commSubGoalChild.father);
mothers.push(homeChild.mother, commChild.mother, homeSubGoalChild.mother, commSubGoalChild.mother);

homeChild.siblings.map(value => {
  siblings.push(value);
})

commChild.siblings.map(value => {
  siblings.push(value);
})

homeSubGoalChild.siblings.map(value => {
  siblings.push(value);
})

commSubGoalChild.siblings.map(value => {
  siblings.push(value);
})

stats.push(
  makeOneStat(       homeChild.child.yearAdmitted, NUM_LABELS),
  makeOneStat(       commChild.child.yearAdmitted, NUM_LABELS),
  makeOneStat(homeSubGoalChild.child.yearAdmitted, NUM_LABELS),
  makeOneStat(commSubGoalChild.child.yearAdmitted, NUM_LABELS)
)

console.log("children:", children);

const users = await makeUsers();

const families = makeFamilies(NUM_FAMILIES);


// mongodb time
try {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("Successfully connected to Atlas.");
} catch (err) {
  console.log(err.stack);
}

const childModel = Child;
const parentModel = Parent;
const fatherModel = Father;
const motherModel = Mother;
const siblingModel = Sibling;
const statsModel = Stats;
const usersModel = User;
const familyModel = Family;

console.log("Database name:", Child.db.name);

try {
  if (DELETE_DATA) {
    await Promise.all([
      Child.deleteMany({}),
      Parent.deleteMany({}),
      Father.deleteMany({}),
      Mother.deleteMany({}),
      Family.deleteMany({}),
      Sibling.deleteMany({}),
      Stats.deleteMany({})
    ]);
  }
  console.log("Deleted data of children, family, parents, siblings, and User")

  console.log("Inserting child collection data...");
  await childModel.insertMany(children);

  console.log("Inserting parent collection data...");
  await parentModel.insertMany(parents);

  console.log("Inserting father collection data...");
  await fatherModel.insertMany(fathers);

  console.log("Inserting mother collection data...");
  await motherModel.insertMany(mothers);

  console.log("Inserting sibling collection data...");
  await siblingModel.insertMany(siblings);

  console.log("Inserting family collection data...");
  await familyModel.insertMany(families);

  console.log("Inserting stats collection data...");
  statsModel.insertMany(stats);

  const userCount = await usersModel.estimatedDocumentCount()
  if (userCount) {
      console.log("Users already exists!");
  } else {
    console.log("Inserting users collection data...");
    usersModel.insertMany(users);
  }
  console.log("Done inserting data.");
} catch (e) {
  console.log("Error!");
  console.error(e);
}
