const router = require("express").Router();
const UserController = require("../controller/UserController");
const authentication = require("../middleware/authentication");
const authorizationUser = require("../middleware/authorizationUser");

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

module.exports = router;
