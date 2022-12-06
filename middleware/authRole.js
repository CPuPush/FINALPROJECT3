const { User } = require("../models");

async function authRole(req, res, next) {
  try {
    const authenticationUserId = res.dataUser.id;

    const userById = await User.findOne({
      where: {
        id: authenticationUserId,
      },
    });

    if (userById.role !== 0) {
      return res.status(401).json({ message: "only accessible by admin" });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

module.exports = authRole;
