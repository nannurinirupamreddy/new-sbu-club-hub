const bcrypt = require("bcrypt");

async function hashPassword(userPass) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(userPass, salt);
  return hashedPass;
}

async function verifyPassword(enteredPass, originalPassword) {
  return bcrypt.compare(enteredPass, originalPassword);
}

module.exports.hashPassword = hashPassword;
module.exports.verifyPassword = verifyPassword;
