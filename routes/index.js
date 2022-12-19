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
router.post("/users/register", UserController.userRegister); // checked bug
router.post("/users/login", UserController.userLogin); // checked clear
router.put(
  "/users/:userId",
  authenticationUser,
  authorizationUser,
  UserController.updateUser
); // checked clear
router.delete(
  "/users/:userId",
  authenticationUser,
  authorizationUser,
  UserController.deleteUser
); // checked clear
router.patch(
  "/users/topup",
  authenticationUser,
  authenticationUser,
  UserController.topUpUser
); // checked clear

//! Category
router.post(
  "/categories",
  authenticationUser,
  authorizationCategory,
  CategoryController.postCategory
); // Checked bug
router.get(
  "/categories",
  authenticationUser,
  authorizationCategory,
  CategoryController.getCategory
); // checked clear
router.patch(
  "/categories/:categoryId",
  authenticationUser,
  authorizationCategory,
  CategoryController.patchCategory
); // checked clear
router.delete(
  "/categories/:categoryId",
  authenticationUser,
  authorizationCategory,
  CategoryController.deleteCategory
); // checked clear

// ! Products
router.post(
  "/products",
  authenticationUser,
  authorizationProduct,
  ProductController.postProduct
); // checked BUG
router.get("/products", authenticationUser, ProductController.getProduct); // Checked Clear
router.put(
  "/products/:productId",
  authenticationUser,
  authorizationProduct,
  ProductController.updateProduct
); // Checked BUG
router.patch(
  "/products/:productId",
  authenticationUser,
  authorizationProduct,
  ProductController.patchProduct
); // Checked BUG
router.delete(
  "/products/:productId",
  authenticationUser,
  authorizationProduct,
  ProductController.deleteProduct
); // Checked Clear

// ! TransactionHistories
router.post(
  "/transactions",
  authenticationUser,
  TransactionController.postTransaction
); // Checked BUG
router.get(
  "/transactions/user",
  authenticationUser,
  TransactionController.getTransactionUser
); // Checked Clear
router.get(
  "/transactions/admin",
  authenticationUser,
  authorizationTransaction,
  TransactionController.getTransactionAdmin
); // Checked Clear
router.get(
  "/transactions/:transactionId",
  authenticationUser,
  authorizationTransactionId,
  TransactionController.getTransactionById
); // Checked BUG
module.exports = router;

/* 
Bug: 

Notes : tidak dicantumkan (tidak ada)

 USER :

 female input tidak bisa
 email tidak dicantumkan tetap membuat user baru
 full_name tidak dicantumkan tetap membuat user baru
 gender tidak dicantumkan tetep membuat user baru

 CATEGORY :
 type tidak dicantumkan tetap membuat categori baru dengan nilai null 

 Product :

	Post
 CategoryId, stock, title tidak dicantumkan tetap membuat product baru
 Price tidak dicantumkan tetap membuat product baru dengan value price NaN
 stock validate tidak berfungsi
 stock bernilai null meskipun diinput

	Put
 tidak Menampilkan title, stock, price saat update ketika title/stock/price tidak dicantumkan 

	Patch
 CategoryId tidak dicantumkan tidak melakukan response bad

 Transaction Histories :

 sold_product_amount is string
 getTransactionById : admin mengakses tetapi mengeluarkan Forbidden

 */