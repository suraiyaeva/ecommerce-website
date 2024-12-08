import express from "express";
import {
  allUsersController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/userController.js";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

//http://localhost:4000/api/v1/users/register
userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/logout", logoutController);

//Admin ROutes
userRouter.get("/all-users", isAuthorized, isAdmin, allUsersController);

export default userRouter;
