import resultNames from './readFiles.js'
import { makeChild } from './make_children.js';

import { assignFather, assignMother } from './make-parent.js';
import { chooseFromArray, makeFirstName, outputDocuments } from './util.js';
import { assignSiblings } from './make-siblings.js';

import mongoPkg from 'mongodb';
import dotenv from 'dotenv';
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
  siblingArray.map(value => {
    siblings.push(value);
  });

  children.push(child);
}

dotenv.config();

// mongodb time
const mongodb = new MongoClient(process.env.MONGODB_URI,{
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const localDb = mongodb.db("populated-data");
const childCollection = localDb.collection("children");
const parentCollection = localDb.collection("parents");
const siblingCollection = localDb.collection("siblings");

try {
  await childCollection.insertMany(children);
  await parentCollection.insertMany(parents);
  await siblingCollection.insertMany(siblings);

  const cursorChildren = childCollection.find();
  const cursorParents = parentCollection.find();
  const cursorSiblings = siblingCollection.find();
} catch (e) {
  console.error(e);
}


