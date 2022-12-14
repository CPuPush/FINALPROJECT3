'use strict';
const {
  Model
} = require('sequelize');
const { unsubscribe } = require('../routes');
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
    }
  }
  Category.init({
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "type cannot be empty"
        }
      }
    },
    sold_product_amount: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "sold_product_amount cannot be empty"
        },
        isInt: {
          args: true,
          msg: "Please enter valid sold sold_product_amount"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    hooks:{
      beforeCreate: (category, opt)=>{
        category.sold_product_amount = 0
      }
    }
  });
  return Category;
};