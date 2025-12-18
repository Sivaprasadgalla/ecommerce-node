const express = require("express");
const router = express.Router();

const {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/Products");

const { validateAccessToken } = require("../middleware/authMiddleware");
const { validateAdmin } = require("../middleware/authMiddleware");
//routes for the products
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/add", validateAccessToken, validateAdmin, createProduct);
router.put("/update/:id", validateAccessToken, validateAdmin,updateProduct);
router.delete("/delete/:id", validateAccessToken, validateAdmin, deleteProduct);
module.exports = router;
