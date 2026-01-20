const ProductModel = require("../models/product.model");

const listProduct = async (req, res) => {
  const {
    productName,
    productPrice,
    productQuantity,
    productImage,
    productDescription,
  } = req.body;

  try {
    const product = await ProductModel.create(req.body);

    res.status(201).send({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
        message: "Product creation failed",
      });
  }
};


module.exports={
    listProduct
}
