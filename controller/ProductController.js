const { Product, Category } = require("../models");
const { balanceFormat } = require("../helper/moneyFormat");

class ProductController {
  static async createProduct(req, res) {
    try {
      const { title, price, stock, CategoryId } = req.body;
      const findCategoryId = await Category.findOne({
        where: {
          id: CategoryId,
        },
      });

      if (!findCategoryId) {
        return res.status(404).json({ message: "Category not found" });
      }

      const data = {
        title,
        price,
        stock,
        CategoryId,
      };

      const createProduct = await Product.create(data);
      return res.status(201).json({
        product: {
          id: createProduct.id,
          title,
          price: balanceFormat(createProduct.price),
          stock,
          CategoryId,
          updatedAt: createProduct.updatedAt,
          createdAt: createProduct.createdAt,
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

  // ! Kurang monet Format
  static async getProducts(req, res) {
    try {
      const data = await Product.findAll();
      // const findOne = await Product.findOne({
      //   id: findAll.id,
      //   title: findAll.title,
      //   price: balanceFormat(findAll.price),
      //   stock: findAll.stock,
      //   CategoryId: findAll.CategoryId,
      //   updatedAt: findAll.updatedAt,
      //   createdAt: findAll.createdAt,
      // });
      return res.status(200).json({ products: data });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  static async updateProductById(req, res) {
    try {
      const { productId } = req.params;
      const { price, stock, title } = req.body;
      const data = {
        price,
        stock,
        title,
      };

      const updateProduct = await Product.update(data, {
        where: {
          id: +productId,
        },
      });

      if (!updateProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      const productFind = await Product.findByPk(productId);

      if (!productFind) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({
        product: {
          id: productFind.id,
          title: productFind.title,
          price: balanceFormat(productFind.price),
          stock: productFind.stock,
          CategoryId: productFind.CategoryId,
          updatedAt: productFind.updatedAt,
          createdAt: productFind.createdAt,
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
      console.error(error);
      return res.status(500).json(error);
    }
  }

  static async patchProductById(req, res) {
    try {
      const { productId } = req.params;
      const { CategoryId } = req.body;
      const data = {
        CategoryId,
      };

      const categoryById = await Category.findOne({
        where: {
          id: +CategoryId,
        },
      });

      if (!categoryById) {
        return res.status(404).json({ message: "Category not found" });
      }

      await Product.update(data, {
        where: {
          id: +productId,
        },
      });

      const productFind = await Product.findByPk(productId);

      if (!productFind) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({
        product: {
          id: productFind.id,
          title: productFind.title,
          price: balanceFormat(productFind.price),
          stock: productFind.stock,
          CategoryId,
          updatedAt: productFind.updatedAt,
          createdAt: productFind.createdAt,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      const deleted = await Product.destroy({
        where: {
          id: productId,
        },
      });

      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res
        .status(200)
        .json({ message: "Product has been successfully deleted" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = ProductController;
