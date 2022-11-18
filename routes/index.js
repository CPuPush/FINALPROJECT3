const router = require('express').Router();
const UserController = require('../controller/UserController');

router.post('/users/register', UserController.userRegister);

module.exports = router;