const { User, Product, Category, TransactionHistory } = require("../models");
const { balanceFormat } = require("../helper/moneyFormat");

class TransactionController {
  static async postTransaction(req, res) {
    try {
      const { ProductId, quantity } = req.body;
      const userId = authUser.id;
      // ! Product
      const dataProduct = await Product.findOne({
        where: {
          id: ProductId,
        },
      });
      if(!dataProduct){
        return res.status(404).json({message: "ProductId not found"});
      }

      // ! User
      const userData = await User.findOne({
        where: {
          id: userId,
        },
      });

      // ! Category
      const categoryData = await Category.findOne({
        where: {
          id: dataProduct.CategoryId,
        },
      });

      // ! check stock product
      if (quantity > dataProduct.stock) {
        return res
          .status(400)
          .json({ message: "Quantity exceeds Product stock" });
      }
      // ! check user balance
      const totalPrice = quantity * dataProduct.price;
      if (totalPrice > userData.balance) {
        return res.status(400).json({ message: "Your balance is not enough" });
      }
      // ! update stock product
      const newStock = dataProduct.stock - quantity;
      await Product.update(
        {
          stock: newStock,
        },
        {
          where: {
            id: ProductId,
          },
        }
      );
      // ! update user balance
      const newBalance = userData.balance - totalPrice;
      await User.update(
        {
          balance: newBalance,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      // ! update Category
      const newSoldProductAmmount = categoryData.sold_product_amount + quantity;
      await Category.update(
        {
          sold_product_amount: newSoldProductAmmount,
        },
        {
          where: {
            id: dataProduct.CategoryId,
          },
        }
      );
      // ! TransactionHistories
      const data = {
        ProductId,
        UserId: userId,
        quantity,
        total_price: totalPrice,
      };
      const dataHistory = await TransactionHistory.create(data);
      // ! RESULT
      return res.status(201).json({
        message: "You have successfully purchase the product",
        transactionBill: {
          total_price: balanceFormat(dataHistory.total_price),
          quantity: dataHistory.quantity,
          product_name: dataProduct.title,
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

  static async getTransactionUser(req, res) {
    try {
      const UserId = authUser.id;
      const dataTransaction = await TransactionHistory.findAll(
        {
          where: {
            UserId,
          },
        },
        {
          include: {
            model: Product,
            attributes: ["id", "title", "price", "stock", "CategoryId"],
          },
        },
      );
      console.log(UserId);
      return res.status(200).json({ transactionHistories: dataTransaction });
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

  static async getTransactionAdmin(req, res) {
    try {
      const dataTransaction = await TransactionHistory.findAll({
        include: [
          {
            model: Product,
            attributes: ["id", "title", "price", "stock", "CategoryId"],
          },
          {
            model: User,
            attributes: ["id", "email", "balance", "gender", "role"],
          },
        ],
      });
      return res.status(200).json({ transactionHistories: dataTransaction });
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

  static async getTransactionById(req, res) {
    try {
      const { transactionId } = req.params;
      const dataTransactionId = await TransactionHistory.findOne(
        {
          include: {
            model: Product,
            attributes: ["id", "title", "price", "stock", "CategoryId"],
          },
        },
        {
          where: {
            id: transactionId,
          },
        }
      );
      return res.status(200).json(dataTransactionId);
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

module.exports = TransactionController;
