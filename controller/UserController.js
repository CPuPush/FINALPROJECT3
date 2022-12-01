const { User } = require("../models");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");

class UserController {
  static async userRegister(req, res) {
    try {
      const { full_name, password, gender, email } = req.body;

      if (!password) {
        return res.status(400).json({ message: "password cannot be empty" });
      }
      // const hashedPassword = hashPassword(password);
      // return res.status(201);
      const user = await User.create({
        full_name: full_name,
        email: email,
        password: password,
        gender: gender,
        role: 1,
        balance: 0,
      });

      let balanceFormat = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(parseInt(user.balance));

      return res.status(201).json({
        id: user.id,
        full_name,
        email,
        gender,
        balance: balanceFormat,
        createdAt: user.createdAt,
      });
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.log(error);
      return res.status(404).json(error);
    }
  }
}

module.exports = UserController;
