const { TransactionHistory, Product, User, Category } = require("../models");
const { balanceFormat } = require("../helper/moneyFormat");

class TransactionController {
  static async createTransaction(req, res) {
    try {
      const { productId, quantity } = req.body;

      const productById = await Product.findOne({
        where: {
          id: +productId,
        },
      });

      if (!productById) {
        return res.status(404).json({ message: "Product not found" });
      }

      const userById = await User.findOne({
        where: {
          id: +res.dataUser.id,
        },
      });

      let stockProduct = productById.stock;
      let priceProduct = productById.price;
      let balanceUser = userById.balance;
      let totalPrice = priceProduct * quantity;


      if (stockProduct < quantity) {
        return res.status(401).json({ message: "insufficient stock" });
      }

      if (balanceUser < totalPrice) {
        return res
          .status(401)
          .json({ message: "your balance is insufficient" });
      }

      const data = {
        ProductId: productById.id,
        UserId: userById.id,
        quantity: quantity,
        total_price: totalPrice,
      };

      const createTransaction = await TransactionHistory.create(data);

      if (!createTransaction) {
        return res.status(400).json({ message: "Create Transaction failed" });
      }

      await Product.update(
        { stock: stockProduct - quantity },
        {
          where: {
            id: productId,
          },
        }
      );

      await User.update(
        { balance: balanceUser - totalPrice },
        {
          where: {
            id: res.dataUser.id,
          },
        }
      );

      const categoryById = await Category.findOne({
        where: {
          id: +productById.CategoryId,
        },
      });

      await Category.update(
        {
          sold_product_amount: (categoryById.sold_product_amount =
            categoryById.sold_product_amount + quantity),
        },
        {
          where: {
            id: categoryById.id,
          },
        }
      );

      return res.status(201).json({
        message: "You have successfully purchase the product",
        transactionBill: {
          total_price: balanceFormat(totalPrice),
          quantity: quantity,
          product_name: productById.title,
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
      console.log(error);
      return res.status(404).json(error);
    }
  }
}

module.exports = TransactionController;
