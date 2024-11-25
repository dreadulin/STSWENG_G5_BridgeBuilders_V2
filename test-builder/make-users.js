import "./util.js"
import bcrypt from "bcrypt";

export async function makeUsers() {
  const validUserTypes = ["community", "homeCare", "superUser"];
  const usernameMap = new Map();
  usernameMap.set('community', 'comm');
  usernameMap.set('homeCare', 'home');
  usernameMap.set('superUser', 'super');

  const passwordMap = new Map();
  passwordMap.set('community', 'comm');
  passwordMap.set('homeCare', 'home');
  passwordMap.set('superUser', 'super');

  /*
  const users = validUserTypes.map(async value => {
    const username = usernameMap.get(value);
    const hashedPassword = await bcrypt.hash(passwordMap.get(value), 10);
    const newUser = {
      username: username,
      password: hashedPassword,
      userType: value
    };

    return newUser;
  });
  */
  const users = [];
  
  for (let i = 0; i < validUserTypes.length; i++) {
    const value = validUserTypes[i];
    const username = usernameMap.get(value);
    const hashedPassword = await bcrypt.hash(passwordMap.get(value), 10);
    const newUser = {
      username: username,
      password: hashedPassword,
      userType: value
    };
    
    users.push(newUser);
  }

  return users;
}
