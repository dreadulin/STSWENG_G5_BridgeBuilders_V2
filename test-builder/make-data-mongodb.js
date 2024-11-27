import resultNames from "./readFiles.js";
import { makeChild } from "./make_children.js";

import { assignFather, assignMother } from "./make-parent.js";
import { chooseFromArray, makeFirstName, outputDocuments } from "./util.js";
import { makeStats } from "./make_stats.js";
import { assignSiblings } from "./make-siblings.js";

import mongoPkg from "mongodb";
import dotenv from "dotenv";
import { makeUsers } from "./make-users.js";
import {makeFamilies} from "./make-family.js";
const { MongoClient, ServerApiVersion } = mongoPkg;

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

  const stat = makeOneStat(child.date.getFullYear(), NUM_LABELS);

  stats.push(stat);

  children.push(child);
}

const users = await makeUsers();

const families = makeFamilies(5);


// mongodb time
const mongodb = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await mongodb.connect();
  console.log("Successfully connected to Atlas.");
} catch (err) {
  console.log(err.stack);
}

const localDb = mongodb.db();
const childCollection = localDb.collection("children");
const parentCollection = localDb.collection("parents");
const siblingCollection = localDb.collection("siblings");
const statsCollection = localDb.collection("stats");
const usersCollection = localDb.collection("users");
const familyCollection = localDb.collection("families");
const fatherCollection = localDb.collection("fathers");
const motherCollection = localDb.collection("mothers");

console.log("Database name:", localDb.databaseName);

try {
  if (DELETE_DATA) {
    await Promise.all([
      childCollection.deleteMany({}),
      parentCollection.deleteMany({}),
      siblingCollection.deleteMany({}),
      statsCollection.deleteMany({}),
      usersCollection.deleteMany({}),
      familyCollection.deleteMany({}),
      fatherCollection.deleteMany({}),
      motherCollection.deleteMany({}),
      childCollection.deleteMany({})
    ])
  }
  console.log("Deleted data of children, family, parents and siblings")

  console.log("Inserting child collection data...");
  await childCollection.insertMany(children);

  console.log("Inserting parent collection data...");
  await parentCollection.insertMany(parents);

  console.log("Inserting father collection data...");
  await fatherCollection.insertMany(fathers);

  console.log("Inserting mother collection data...");
  await motherCollection.insertMany(mothers);

  console.log("Inserting sibling collection data...");
  await siblingCollection.insertMany(siblings);

  console.log("Inserting family collection data...");
  await familyCollection.insertMany(families);

  await statsCollection.countDocuments({}, { limit: 1 }).then((count) => {
    if (count) {
      console.log("Updating stats collection data...");
      stats.map((value) => {
        statsCollection.updateMany({}, { $set: value });
      });
    } else {
      console.log("Inserting stats collection data...");
      statsCollection.insertMany(stats);
    }
  });

  await usersCollection.countDocuments({}, { limit: 1 }).then((count) => {
    if (count) {
      console.log("Users already exists!");
    } else {
      console.log("Inserting users collection data...");
      usersCollection.insertMany(users);
    }
  });

  console.log("Done inserting data.");
} catch (e) {
  console.log("Error!");
  console.error(e);
}
