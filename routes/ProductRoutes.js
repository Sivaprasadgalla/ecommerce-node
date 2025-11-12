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
router.use(validateAccessToken);
//routes for the products
router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/add", validateAdmin, createProduct);
router.put("/update/:id", validateAdmin, updateProduct);
router.delete("/delete/:id", validateAdmin, deleteProduct);
module.exports = router;
