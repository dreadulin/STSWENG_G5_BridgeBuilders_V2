import randomInteger from "random-int";
import { chooseFromArray, randomListStr, randomStr } from "./util.js";

export function makeFamilies(num) {
  const families = [];

  while (num > 0) {
    const family = {
      bata: randomStr(),
      //education
      ilanNagaaral: randomInteger(0, 4),
      ilanBaon: randomInteger(0, 4),
      saanGastosBaon: randomStr(),
      schoolActivity: randomListStr(),
      kainPasok: chooseFromArray([true, false]), //kumakain bago pumasok ng school
      alsAttend: chooseFromArray([true, false]),
      //health
      checkup: chooseFromArray([true, false]),
      familyPlanningMethod: randomStr(),
      saanTubig: randomStr(),
      saanLaba: randomStr(),
      saanCR: randomStr(),
      sakit: randomListStr(),
      ilanKain: randomInteger(1, 3), //ilang beses kumakain sa isang araw
      ilanLigo: randomInteger(1, 3), //ilang beses naliligo sa isang araw
      //socio-economic
      ipon: chooseFromArray([true, false]),
      utang: chooseFromArray([true, false]),
      dswd: chooseFromArray([true, false]),
    };

    families.push(family);
    num -= 1;
  }

  return families;
}
