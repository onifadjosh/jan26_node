const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const listProduct = async (req, res) => {
  const {
    productName,
    productPrice,
    productQuantity,
    productImage,
    productDescription,
  } = req.body;

  try {
    const image = await cloudinary.uploader
      .upload(productImage)
      .then((result) => {

        const ImageObject = {
          url: result.secure_url,
          public_id:result.public_id
        }
        return ImageObject
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    const product = await ProductModel.create({
    
        productName,
        productPrice,
        productQuantity,
        productDescription,
        productImage: image,

      createdBy: req.user,
    });
    console.log("User ID being saved:", req.user);

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
    const products = await ProductModel.find().populate(
      "createdBy",
      "name email username _id"
    );
    // const products = await ProductModel.find().select("-productName")
    console.log("First Product Creator ID:", products[0]?.createdBy);

    res.status(200).send({
      message: "product fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({ message: "products not found" });
  }
};

const getProductsBy = async (req, res) => {
  const { productName, productPrice, createdBy } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  try {
    const filter = {};
    if (productName)
      filter.productName = { $regex: productName, $options: "i" };
    if (createdBy) filter.createdBy = createdBy;
    if (productPrice) filter.productPrice = productPrice;

    const products = await ProductModel.find(filter)
      .populate("createdBy", "name email username _id")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    console.log("First Product Creator ID:", products[0]?.createdBy);

    const total = await ProductModel.countDocuments(filter);
    res.status(200).send({
      message: "product fetched successfully",
      products,

      meta: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({ message: "products not found" });
  }
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await ProductModel.findById(id)

    const deletedProd = await ProductModel.findByIdAndDelete({ _id: id });

    console.log(prod.productImage.public_id);
    

    await cloudinary.uploader.destroy(prod.productImage.public_id)

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

    let product = await ProductModel.findByIdAndUpdate(id, allowedupdate, {
      new: true,
    });
    res.status(200).send({
      message: "product updated successfully",
      product,
    });

    if (!product) {
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
  getProductsBy,
};
