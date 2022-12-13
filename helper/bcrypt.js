const bcrypt = require('bcrypt');

const hashPassword = (userPassword) => {
  const saltRound = 10;
  const hashedPassword = bcrypt.hashSync(userPassword, saltRound);
  return hashedPassword
};

const comparePassword = (userPassword, hashedPasswod) => {
  return bcrypt.compareSync(userPassword, hashedPasswod);
}

module.exports = { hashPassword, comparePassword };