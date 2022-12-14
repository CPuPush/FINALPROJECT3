const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { balanceFormat } = require("../helper/moneyFormat");
const { generateToken } = require("../helper/jwt");
const { User } = require("../models");

class UserController {
  static async userRegister(req, res) {
    try {
      const { full_name, password, gender, email } = req.body;
      const role = "customer";
      const data = await User.create({
        full_name,
        password,
        gender,
        email,
        role,
      });
      return res.status(201).json({
        user: {
          id: data.id,
          full_name,
          email,
          gender,
          balance: balanceFormat(data.balance),
          createdAt: data.createdAt,
        },
      });
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json(error);
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const data = await User.findOne({
        where: {
          email,
        },
      });
      if (!data) {
        return res.status(404).json({ message: "User not Found" });
      }
      const comparedPassword = comparePassword(password, data.password);
      if (comparedPassword) {
        const token = generateToken({
          id: data.id,
          role: data.role,
        });
        return res.status(200).json({ token });
      } else {
        return res.status(404).json({ message: "Email and Password is wrong" });
      }
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json(error);
    }
  }

  static async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const { full_name, email } = req.body;

      const data = {
        full_name,
        email,
      };

      await User.update(data, {
        where: {
          id: userId,
        },
      });
      const userUpdate = await User.findOne({
        where: {
          id: userId,
        },
      });
      return res.status(200).json({
        user: {
          id: userUpdate.id,
          full_name: userUpdate.full_name,
          email: userUpdate.email,
          createdAt: userUpdate.createdAt,
          updatedAt: userUpdate.updatedAt,
        },
      });
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return res
        .status(200)
        .json({ message: "Your account has been successfully deleted" });
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json(error);
    }
  }

  static async topUpUser(req, res) {
    try {
      const { balance } = req.body;
      const authenticationUserId = authUser.id;
      const data = await User.findOne({
        where: {
          id: authenticationUserId,
        },
      });
      let newBalance = Number(balance) + Number(data.balance);
      await User.update(
        {
          balance: newBalance,
        },
        {
          where: {
            id: authenticationUserId,
          },
        }
      );
      return res.status(200).json({
        message: `Your balance has been successfully updated to Rp ${newBalance}`,
      });
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      return res.status(500).json(error);
    }
  }
}
module.exports = UserController;
