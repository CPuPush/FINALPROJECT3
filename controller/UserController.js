class UserController{

  static async userRegister(req, res){
    try {
      const {full_name, password, gender, email} = req.body;
    } catch (error) {
      return res.json('error');
    }
  }

}
module.exports = UserController;