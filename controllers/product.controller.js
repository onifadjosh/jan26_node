const { omitUndefined } = require("mongoose");
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

const getProducts = async (req, res) => {
  // res.render("product", { products });
  try {
    console.log("hello");
    const products = await ProductModel.find();
    // const products = await ProductModel.find().select("-productName")
    res.status(200).send({
      message: "product fetched successfully",
      products,
    });
  } catch (error) {
    res.status(404).send({ message: "products not found" });
  }
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProd = await ProductModel.findByIdAndDelete({ _id: id });

    res.status(200).send({
      message: "Product Deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: "Product Deletion failed",
    });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, productPrice } = req.body;
  try {
    let allowedupdate = {
      ...(productName && { productName }),
      ...(productPrice && { productPrice }),
    };
   
      let product = await ProductModel.findByIdAndUpdate(
        id,
        allowedupdate,
        { new: true }
      );
      res.status(200).send({
        message: "product updated successfully",
        product,
      });
 
      if(!product){
        res.status(404).send({
          message: "product not found",
        });
      }

  } catch (error) {
    res.status(400).send({
      message: "product cannot be updated",
    });
  }
};

module.exports = {
  listProduct,
  getProducts,
  deleteProducts,
  editProduct,
};
