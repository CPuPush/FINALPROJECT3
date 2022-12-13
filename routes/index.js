const router = require("express").Router();
const UserController = require("../controller/UserController");
const authenticationUser = require("../middleware/authenticationUser");
const authorizationUser = require("../middleware/authorizationUser");
const CategoryController = require("../controller/CategoryController");
const authorizationCategory = require("../middleware/authorizationCategory");
const ProductController = require("../controller/ProductController");
const authorizationProduct = require("../middleware/authorizationProduct");
const TransactionController = require("../controller/TransactionController");
const authorizationTransaction = require("../middleware/authorizationTransaction");
const authorizationTransactionId = require("../middleware/authorizationTransactionId");

// ! User
router.post("/users/register", UserController.userRegister);
router.post("/users/login", UserController.userLogin);
router.put(
  "/users/:userId",
  authenticationUser,
  authorizationUser,
  UserController.updateUser
);
router.delete(
  "/users/:userId",
  authenticationUser,
  authorizationUser,
  UserController.deleteUser
);
router.patch(
  "/users/topup",
  authenticationUser,
  authenticationUser,
  UserController.topUpUser
);

//! Category
router.post(
  "/categories",
  authenticationUser,
  authorizationCategory,
  CategoryController.postCategory
);
router.get(
  "/categories",
  authenticationUser,
  authorizationCategory,
  CategoryController.getCategory
);
router.patch(
  "/categories/:categoryId",
  authenticationUser,
  authorizationCategory,
  CategoryController.patchCategory
);
router.delete(
  "/categories/:categoryId",
  authenticationUser,
  authorizationCategory,
  CategoryController.deleteCategory
);

// ! Products
router.post(
  "/products",
  authenticationUser,
  authorizationProduct,
  ProductController.postProduct
);
router.get("/products", authenticationUser, ProductController.getProduct);
router.put(
  "/products/:productId",
  authenticationUser,
  authorizationProduct,
  ProductController.updateProduct
);
router.patch(
  "/products/:productId",
  authenticationUser,
  authorizationProduct,
  ProductController.patchProduct
);
router.delete(
  "/products/:productId",
  authenticationUser,
  authorizationProduct,
  ProductController.deleteProduct
);

// ! TransactionHistories
router.post(
  "/transactions",
  authenticationUser,
  TransactionController.postTransaction
);
router.get(
  "/transactions/user",
  authenticationUser,
  TransactionController.getTransactionUser
);
router.get(
  "/transactions/admin",
  authenticationUser,
  authorizationTransaction,
  TransactionController.getTransactionAdmin
);
router.get(
  "/transactions/:transactionId",
  authenticationUser,
  authorizationTransactionId,
  TransactionController.getTransactionById
);
module.exports = router;
