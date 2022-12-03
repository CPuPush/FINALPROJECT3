const { User } = require("../models");
const { balanceFormat } = require("../helper/moneyFormat");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");

class UserController {
  static async userRegister(req, res) {
    try {
      const { full_name, password, gender, email } = req.body;

      if (!password) {
        return res.status(400).json({ message: "password cannot be empty" });
      }

      const user = await User.create({
        full_name: full_name,
        email: email,
        password: password,
        gender: gender,
        role: 1,
      });

      return res.status(201).json({
        id: user.id,
        full_name,
        email,
        gender,
        balance: balanceFormat(user.balance),
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

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!password) {
        return res.status(400).json({ msg: "Password is empty" });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else {
        const compare = comparePassword(password, user.password);
        if (!compare) {
          return res.status(400).json({ message: "Password is wrong" });
        } else {
          const token = generateToken({
            id: user.id,
            email: user.email,
          });
          return res.status(200).json({ token });
        }
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

  static async userUpdate(req, res) {
    try {
      const { userId } = req.params;
      const { email, full_name } = req.body;
      const data = {
        email,
        full_name,
      };

      await User.update(data, {
        where: {
          id: userId,
        },
      });

      return res.status(200).json({ msg: "Successfull" });
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error(error);
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
      return res.status(500).json(error);
    }
  }

  static async userTopup(req, res) {
    try {
      const { balance } = req.body;

      const balanceNow = Number(balance) + Number(res.dataUser.balance);

      const data = {
        balance: parseInt(balanceNow),
      };

      await User.update(data, {
        where: {
          id: res.dataUser.id,
        },
      });

      return res.status(200).json({
        message: `Your balance has been successfully updated to Rp ${balanceFormat(
          balance
        )}`,
      });
    } catch (error) {
      let errorMes = error.name;
      if (
        errorMes === "SequelizeUniqueConstraintError" ||
        errorMes === "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error(error);
      return res.status(500).json(error);
    }
  }
}

module.exports = UserController;
