const router = require("express").Router();
const authentication = require("../middleware/authentication");
const UserController = require("../controller/UserController");
const authorizationUser = require("../middleware/authorizationUser");
const CategoryController = require("../controller/CategoryController");
const authorizationCategory = require("../middleware/authorizationCategory");
const ProductController = require("../controller/ProductController");
const authRole = require("../middleware/authRole");

// ! USER
router.post("/users/register", UserController.userRegister);
router.post("/users/login", UserController.userLogin);
router.put(
  "/users/:userId",
  authentication,
  authorizationUser,
  UserController.userUpdate
);
router.delete(
  "/users/:userId",
  authentication,
  authorizationUser,
  UserController.deleteUser
);
router.patch("/users/topup", authentication, UserController.userTopup);

// ! CATEGORY
router.post(
  "/categories",
  authentication,
  authRole,
  CategoryController.createCategory
);
router.get("/categories", authentication, CategoryController.getAllCategory);
router.patch(
  "/categories/:categoryId",
  authentication,
  authRole,
  authorizationCategory,
  CategoryController.patchCategory
);
router.delete(
  "/categories/:categoryId",
  authentication,
  authRole,
  authorizationCategory,
  CategoryController.deleteCategory
);

// ! PRODUCT
router.post("/products", authentication, ProductController.createProduct);
router.get("/products", authentication, ProductController.getProducts);
router.put(
  "/products/:productId",
  authentication,
  ProductController.updateProductById
);
router.patch(
  "/products/:productId",
  authentication,
  ProductController.patchProductById
);
router.delete(
  "/products/:productId",
  authentication,
  ProductController.deleteProduct
);

module.exports = router;
