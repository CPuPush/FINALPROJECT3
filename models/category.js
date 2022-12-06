"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product);
      this.belongsTo(models.User);
    }
  }
  Category.init(
    {
      UserId: DataTypes.INTEGER,
      type: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "type category cant be empty",
          },
        },
      },
      sold_product_amount: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "sold_product_amount cant be empty",
          },
          isInt: {
            args: true,
            msg: "sold_product_amount has integer data type",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.sold_product_amount = 0;
        },
      },
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
