import express from "express";

import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoriesController.js";

const categoriesRouter = express.Router();

//http://localhost:4000/api/v1/categories-POST

//Admin ROutes
categoriesRouter.post("/", isAuthorized, isAdmin, createCategoryController);
//http://localhost:4000/api/v1/categories-GET
categoriesRouter.get("/", getAllCategoriesController);
//http://localhost:4000/api/v1/categories-DELETE
categoriesRouter.delete(
  "/:slug",
  isAuthorized,
  isAdmin,
  deleteCategoryController
);
//GET
categoriesRouter.get(
  "/:slug",
  isAuthorized,
  isAdmin,
  getSingleCategoryController
);
//http://localhost:4000/api/v1/categories-UPDATE
categoriesRouter.put("/:slug", isAuthorized, isAdmin, updateCategoryController);

export default categoriesRouter;
