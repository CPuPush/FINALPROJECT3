const { Category, Product } = require("../models");

class CategoryController {
  static async postCategory(req, res) {
    try {
      const { type } = req.body;
      const data = await Category.create({
        type,
      });
      return res.status(201).json(data);
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

  static async getCategory(req, res) {
    try {
      const data = await Category.findAll({
        include: Product,
      });
      return res.status(500).json({ categories: data });
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

  static async patchCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const { type } = req.body;

      await Category.update(
        {
          type,
        },
        {
          where: {
            id: categoryId,
          },
        }
      );

      const data = await Category.findOne({
        where: {
          id: categoryId,
        },
      });
      if (!data) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.status(200).json(data);
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

  static async deleteCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const data = await Category.destroy({
        where: {
          id: categoryId,
        },
      });
      if (!data) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res
        .status(200)
        .json({ message: "Category has been successfully deleted" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = CategoryController;
