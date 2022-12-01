"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Category);
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
          isEmail: {
            args: true,
            msg: "Please enter valid email format",
          },
          notEmpty: {
            args: true,
            msg: "email cant be empty",
          },
        },
        unique: {
          args: true,
          msg: "Email already exists",
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, 10],
            msg: "long password must be between 6 to 10",
          },
          notEmpty: {
            args: true,
            msg: "password can't be empty",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "gender cant be empty",
          },
          // ! this not fix
          isIn: {
            args: [["male", "female"]],
            msg: "only fill in gender with male or female",
          },
        },
      },
      role: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "Role cant be empty",
          },
          // ! this not fix
          isIn: {
            args: [[0, 1]],
            msg: "only fill in role with admin or customer",
          },
        },
      },
      // ! kurang field username empty
      balance: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            args: true,
            msg: "Balance has integer data type",
          },
          max: 100000000,
          min: 0,
        },
      },
    },
    {
      hooks: {
        beforeValidate: (user, options) => {
          user.balance = 0;
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
