const { User, Product } = require('../models');

async function authorizationUser(req, res, next){
  try {
    const authenticationUserId = authUser.id;

    const userById = await User.findOne({
      where: {
        id: authenticationUserId
      }
    })
    
    if(userById.role === 'admin'){
      return next();
    }else{
      return res.status(403).json({message: "FORBIDDEN FOR CUSTOMER"});
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = authorizationUser;