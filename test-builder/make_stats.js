import randomInteger from "random-int";
import { generateRangeOfYear, randomStr, chooseFromArray } from "./util.js"
import dotenv from "dotenv";

dotenv.config()

function generateLabels(num) {
  const collectionOfLabels = [];

  while (num) {
    const label = {
      label: randomStr(),
      valueKey: randomInteger(0, 10),
    }
    collectionOfLabels.push(label)
    num -= 1;
  }

  return collectionOfLabels;
}

export function makeStats(num, numOfLabels) {
  
  const collectionOfStats = [];

  while (num > 0) {
    const rangeOfYear = generateRangeOfYear;
    const todayYear = chooseFromArray(rangeOfYear(parseInt(process.env.OLDEST_YEAR)));

    const stat = {
      year: todayYear,
      goals: {
        General: generateLabels(numOfLabels),
        Goal1: generateLabels(numOfLabels),
        Goal2: generateLabels(numOfLabels),
        Goal3: generateLabels(numOfLabels),
      }
    };

    collectionOfStats.push(stat);
    num -= 1;
  }

  return collectionOfStats;
}

export function makeOneStat(yearParam, numOfLabels) {
  const stat = {
    year: yearParam,
    goals: {
      General: generateLabels(numOfLabels),
      Goal1: generateLabels(numOfLabels),
      Goal2: generateLabels(numOfLabels),
      Goal3: generateLabels(numOfLabels),
    }
  }

  return stat;
}
