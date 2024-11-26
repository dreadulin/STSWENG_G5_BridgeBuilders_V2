import resultNames from "./readFiles.js";

import { makeChild } from "./make_children.js";

import { assignFather, assignMother } from "./make-parent.js";
import { chooseFromArray, makeFirstName, outputDocuments } from "./util.js";
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

for (let i = 0; i < childCount; i++) {
  const kasarian = chooseFromArray(["Lalaki", "Babae", "Other"]);

  const firstName = makeFirstName(resultNames, kasarian);
  const lastName = resultNames.takeFamilyName();

  const child = makeChild(firstName, lastName, kasarian);
  child.caseNo = 10 + i;

  parents.push(assignFather(child));
  parents.push(assignMother(child));

  fathers.push(assignFather(child));
  mothers.push(assignMother(child));

  const siblingArray = assignSiblings(child, children);
  siblingArray.map((value) => {
    siblings.push(value);
  });

  const stat = makeOneStat(child.date.getFullYear(), NUM_LABELS);

  stats.push(stat);

  children.push(child);
}


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
      Stats.deleteMany({}),
      User.deleteMany({}),
    ]);
  }
  console.log("Deleted data of children, family, parents and siblings")
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

  const statsCount = await statsModel.estimatedDocumentCount()
  if (statsCount) {
    console.log("Updating stats collection data...");
    stats.map((value) => {
      statsModel.updateMany({}, { $set: value });
    });
  } else {
    console.log("Inserting stats collection data...");
    statsModel.insertMany(stats);
  }

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
