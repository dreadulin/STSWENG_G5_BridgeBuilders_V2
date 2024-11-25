import randomInteger from "random-int";
import { generateRangeOfYearFromToday, randomStr, chooseFromArray } from "./util.js"

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
    const rangeOfYear = generateRangeOfYearFromToday;
    const todayYear = chooseFromArray(rangeOfYear(0, 3));

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


