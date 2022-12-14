const { Product } = require('../models');
class ProductController{
  static async postProduct(req, res){
    try {
      const {title, price, stock, CategoryId} = req.body;
      const data = await Product.create({
        title, price, stock, CategoryId
      });
      return res.status(201).json({product: data});

    } catch (error) {
      if(error.name === 'SequelizeForeignKeyConstraintError'){
        return res.status(400).json({message: 'CategoryId is not present in Category Table'})
      }
      return res.status(500).json(error);
    }
  }

  static async getProduct(req, res){
    try {
      const data = await Product.findAll();
      return res.status(200).json({products: data});
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async updateProduct(req, res){
    try {
      const {productId} = req.params;
      const {price, stock, title} = req.body;
      await Product.update({
        price, 
        stock,
        title
      },{
        where:{
          id: productId
        }
      });
      const dataProduct = await Product.findOne({
        where: {
          id: productId
        }
      })
      if(!dataProduct){
        return res.status(404).json({message: "Product not found"})
      }
      return res.status(200).json({product: dataProduct});
      
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async patchProduct(req, res){
    try {
      const {productId} = req.params;
      const {CategoryId} = req.body;

      await Product.update({
        CategoryId
      },{
        where: {
          id: productId
        }
      });
      const dataProduct = await Product.findOne({
        where:{
          id: productId
        }
      });
      if(!dataProduct){
        return res.status(404).json({message: "Product not found"})
      }
      return res.status(200).json(dataProduct);
    } catch (error) {
      if(error.name === 'SequelizeForeignKeyConstraintError'){
        return res.status(400).json({message: 'CategoryId is not present in Category Table'})
      }
      return res.status(500).json(error);
    }
  }

  static async deleteProduct(req, res){
    try {
      const {productId} = req.params;
      await Product.destroy({
        where: {
          id: productId
        }
      });
      return res.status(200).json({message: "Product has been successfully deleted"})
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = ProductController;