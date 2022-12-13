const { User, TransactionHistory } = require('../models');

async function authorizationUser(req, res, next){
  try {
    const { transactionId } = req.params;
    const authenticationUserId = authUser.id;

    const dataTransaction = await TransactionHistory.findOne({
      where: {
        id: transactionId
      }
    });
    if(!dataTransaction){
      return res.status(400).json({message: "Transaction History not found"});
    }
    
    if(authenticationUserId === dataTransaction.UserId){
      return next();
    }else{
      return res.status(403).json({message: "FORBIDDEN"});
    }
  } catch (error) {
    return res.status(500).json(error);
  }


}

module.exports = authorizationUser;