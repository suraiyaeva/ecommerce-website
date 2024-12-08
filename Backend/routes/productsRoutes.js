import express from "express";

import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import {
  addProductController,
  deleteProductController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
} from "../controllers/productsController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const productsRouter = express.Router();

//http://localhost:4000/api/v1/products-POST

//Admin ROutes
productsRouter.get(
  "/",

  getAllProductsController
);
productsRouter.post(
  "/",
  upload.single("picture"),
  isAuthorized,
  isAdmin,
  addProductController
);
//http://localhost:4000/api/v1/products/:slug-GET
productsRouter.get(
  "/:productId",

  getSingleProductController
);

//http://localhost:4000/api/v1/products-DELETE
productsRouter.delete(
  "/:productId",
  isAuthorized,
  isAdmin,
  deleteProductController
);

//GET

//http://localhost:4000/api/v1/products/:slug-UPDATE
productsRouter.put(
  "/:productId",
  upload.single("picture"),
  isAuthorized,
  isAdmin,
  updateProductController
);

export default productsRouter;
