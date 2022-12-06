const { Category } = require("../models");

async function authorizationCategory(req, res, next) {
  try {
    const { categoryId } = req.params;
    const authenticationUserId = res.dataUser.id;

    const categoryById = await Category.findOne({
      where: {
        id: +categoryId,
      },
    });

    if (!categoryById) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (categoryById.UserId === authenticationUserId) {
      next();
    } else {
      return res.status(403).json({ message: "FORBIDDEN" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

module.exports = authorizationCategory;
