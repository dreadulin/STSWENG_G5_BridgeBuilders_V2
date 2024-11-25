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

// select how many children
const childCount = 5;
const children = [];
const parents = [];
const siblings = [];

for (let i = 0; i < childCount; i++) {
  const kasarian = chooseFromArray(["Lalaki", "Babae", "Other"]);

  const firstName = makeFirstName(resultNames, kasarian);
  const lastName = resultNames.takeFamilyName();

  const child = makeChild(firstName, lastName, kasarian);

  parents.push(assignFather(child));
  parents.push(assignMother(child));

  const siblingArray = assignSiblings(child, children);
  siblingArray.map((value) => {
    siblings.push(value);
  });

  children.push(child);
}

const stats = makeStats(5, 3);
console.log(stats);

const users = await makeUsers();
console.log(users);

const families = makeFamilies(5);
console.log(families);

dotenv.config();

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

console.log("Database name:", localDb.databaseName);

try {
  console.log("Inserting child collection data...");
  await childCollection.insertMany(children);

  console.log("Inserting parent collection data...");
  await parentCollection.insertMany(parents);

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
