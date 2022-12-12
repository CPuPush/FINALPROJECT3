const { Category, Product } = require("../models");

class CategoryController {
  static async createCategory(req, res) {
    try {
      const { type } = req.body;
      const UserId = res.dataUser.id;
      const data = {
        type,
        UserId,
      };

      const createCategory = await Category.create(data);
      return res.status(201).json({
        category: {
          id: createCategory.id,
          type: createCategory.type,
          createdAt: createCategory.createdAt,
          updatedAt: createCategory.updatedAt,
          sold_product_amount: createCategory.sold_product_amount,
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

  static async getAllCategory(req, res) {
    try {
      const data = {
        attributes: {
          exclude: ["UserId"],
        },
        include: Product,
      };

      const findCategory = await Category.findAll(data);
      return res.status(200).json({ categories: findCategory });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  // ! This not fix, what is mean of Patch ?
  static async patchCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const { type } = req.body;
      const data = {
        type,
      };

      if (!type) {
        return res.status(400).json({message: "type cannot be empty"});
      }

      await Category.update(data, {
        where: {
          id: +categoryId,
        },
      });

      const findCategory = await Category.findAll({
        attributes: {
          exclude: ["UserId"],
        },
        where: {
          id: categoryId,
        }
      });

      return res.status(200).json({ category: findCategory });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { categoryId } = req.params;
      await Category.destroy({
        where: {
          id: categoryId,
        },
      });
      return res
        .status(200)
        .json({ message: "Category has been successfully deleted" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = CategoryController;
