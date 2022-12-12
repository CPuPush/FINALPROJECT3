const { TransactionHistories, Product, User } = require("../models");
const { balanceFormat } = require("../helper/moneyFormat");

class TransactionController {
  static async createTransaction(req, res) {
    try {
      const { productId, quantity } = req.body;
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

module.exports = TransactionController;
