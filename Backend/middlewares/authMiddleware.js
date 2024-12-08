import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const isAuthorized = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token)
      return res.status(401).send({
        success: false,
        message: "please login to access this resource",
      });
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodedToken.id);
    next();
  } catch (error) {
    console.log(`isAtuhorized middleWare Error ${error}`);
    return res
      .status(400)
      .send({ success: false, message: "isAuthorized middleWare", error });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role != 1) {
      return res.status(401).send({
        success: false,
        message: "You are not authorized to access this resource",
      });
    }
    next();
  } catch (error) {
    console.log(`isAdmin middleWare Error ${error}`);
    return res
      .status(400)
      .send({ success: false, message: "isAdmin middleWare", error });
  }
};
export { isAuthorized, isAdmin };
