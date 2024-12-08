import {
  deleteImageOnCloudinary,
  uploadImageOnCloudinary,
} from "../helper/cloudinaryHelper.js";
import productsModel from "../models/productsModel.js";

const addProductController = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const picture = req.file?.fieldname;
    const picturePath = req.file?.path;
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !picture ||
      !picturePath
    ) {
      return res
        .status(400)
        .send({ success: false, message: "All fields required" });
    }
    //upload image on cloudinary
    const { secure_url, public_id } = await uploadImageOnCloudinary(
      picturePath,
      "products"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error while uploading image",
        error: secure_url,
      });
    }
    const product = await productsModel.create({
      title,
      description,
      category,
      price,
      user: req.user._id,
      picture: {
        secure_url,
        public_id,
      },
    });
    return res.status(201).send({
      success: true,
      message: "Product uploaded successfully",
      product,
    });
  } catch (error) {
    console.log(`addProductController error ${error}`);
    res.status(400).send({
      success: false,
      message: "Error in addProductController",
      error,
    });
  }
};
const getAllProductsController = async (req, res) => {
  try {
    const products = await productsModel
      .find({})
      .populate("user", "name")
      .populate("category", "name");
    return res.status(200).send({
      success: true,
      total: products.length,
      message: "All Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(`getAllProductsController error ${error}`);
    res.status(400).send({
      success: false,
      message: "Error in getAllProductsController",
      error,
    });
  }
};
const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productsModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    //delete product image from cloudinary
    if (product.picture && product.picture.public_id) {
      await deleteImageOnCloudinary(product.picture.public_id);
    }

    await productsModel.findOneAndDelete(productId);

    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(`deleteProductController error ${error}`);
    res.status(400).send({
      success: false,
      message: "Error in deleteProductController",
      error,
    });
  }
};
const getSingleProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productsModel
      .findById(productId)
      .populate("user", "name")
      .populate("category", "name");
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    //delete product image from cloudinary

    return res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(`getSingleProductController error ${error}`);
    res.status(400).send({
      success: false,
      message: "Error in getSingleProductController",
      error,
    });
  }
};
const updateProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description, category, price } = req.body;
    const picturePath = req.file?.path;

    const product = await productsModel.findById(productId);

    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    if (title) product.title = title;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price) product.price = price;

    //upload new image code
    if (picturePath) {
      const { secure_url, public_id } = await uploadImageOnCloudinary(
        picturePath,
        "products"
      );

      //delete previous image code
      if (product.picture && product.picture.public_id) {
        await deleteImageOnCloudinary(product.picture.public_id);
      }

      product.picture = {
        secure_url,
        public_id,
      };
    }
    await product.save();

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(`updateProductController error ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in updateProductController",
      error,
    });
  }
};

export {
  addProductController,
  getAllProductsController,
  deleteProductController,
  getSingleProductController,
  updateProductController,
};
