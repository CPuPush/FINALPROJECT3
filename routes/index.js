const router = require("express").Router();
const authentication = require("../middleware/authentication");
const UserController = require("../controller/UserController");
const authorizationUser = require("../middleware/authorizationUser");
const CategoryController = require("../controller/CategoryController");
const authorizationCategory = require("../middleware/authorizationCategory");
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

module.exports = router;
