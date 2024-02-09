import express from "express";
const router  = express.Router();
import signUp from "./signUp.js"
import login from "./login.js";
import postProdut from "./postAllProduct.js"
import loginVerify from "./AdminLoginTF.js";
import getAllUsers from "./getAllUsers.js"
router.use("/signup" , signUp);
router.use("/login" , login);
router.use("/loginVerify" , loginVerify);
router.use("/postProduct" , postProdut);
router.use("/getAllusers" , getAllUsers);
export default router;