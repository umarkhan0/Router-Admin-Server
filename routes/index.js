import express from "express";
const router  = express.Router();
import signUp from "./signUp.js"
import login from "./login.js";
import postProdut from "./Produts/AddProduct.js"
import loginVerify from "./AdminLoginTF.js";
import getAllUsers from "./getAllUsers.js";
import deleteProduct from "./Produts/productDelete.js"
import updateProduct from "./Produts/updateProducts.js";
import getProducts from "./Produts/getProducts.js"
router.use("/signup" , signUp);
router.use("/login" , login);
router.use("/product" , updateProduct);
router.use("/productDelete" , deleteProduct);
router.use("/loginVerify" , loginVerify);
router.use("/postProduct" , postProdut);
router.use("/getAllusers" , getAllUsers);
router.use("/getallProducts" , getProducts);
export default router;