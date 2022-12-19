"use strict";
const { Model } = require("sequelize");
const { balanceFormat } = require("../helper/moneyFormat");
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product);
      this.belongsTo(models.User);
    }
  }
  TransactionHistory.init(
    {
      ProductId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "ProductId cannot be empty",
          },
          isNumeric: {
            args: true,
            msg: "please enter valid ProductId",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "quantity cannot be empty",
          },
          isInt: {
            args: true,
            msg: "please enter valid quantity format",
          },
        },
      },
      total_price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "total_price cannot be empty",
          },
          isNumeric: {
            args: true,
            msg: "please enter valid total_price format",
          },
        },
        get() {
          return balanceFormat(this.getDataValue("total_price"));
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionHistory",
    }
  );
  return TransactionHistory;
};
