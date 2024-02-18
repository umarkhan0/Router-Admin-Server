import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../../middlewere/verifyToken.js";
import Admin from "../../models/SingUp.js";
import AddProducts from "../../models/AddProduct.js";
const router = express.Router();

router.delete("/:productId", verifyToken, async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
        const user = await Admin.findOne({ email: decoded.email });
        if (!user || user.email !== decoded.email || user.password !== decoded.password) {
            return res.status(404).send({ message: "Wrong Auth" });
        }
        const deletedProduct = await AddProducts.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        return res.status(200).send({ message: "Product deleted successfully" });
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});
export default router;