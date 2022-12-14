"use strict";
const { Model, Sequelize } = require("sequelize");
const { hashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.TransactionHistory);
    }
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "full_name cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "email cannot be empty",
          },
          isEmail: {
            args: true,
            msg: "please enter valid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "password cannot be empty",
          },
          len: {
            args: [6, 10],
            msg: "password length must be between 6 to 10",
          },
        },
      },
      gender: {
        type: Sequelize.ENUM("male", "female"),
        validate: {
          notEmpty: {
            args: true,
            msg: "Gender cannot be empty",
          },
          isIn: {
            args: ['male', 'female'],
            msg: "Incorrect gender input"
          }
          
        },
      },
      role: {
        type: Sequelize.ENUM("admin", "customer"),
        validate: {
          notEmpty: {
            args: true,
            msg: "gender cannot be empty",
          },
        },
      },
      balance: {
        type: DataTypes.BIGINT,
        validate: {
          notEmpty: {
            args: true,
            msg: "balance cannot be empty",
          },
          isNumeric: {
            args: true,
            msg: "please enter valid balance",
          },
          max: 100000000,
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, opt) => {
          user.password = hashPassword(user.password);
          user.balance = 0;
        },
      },
    }
  );
  return User;
};
