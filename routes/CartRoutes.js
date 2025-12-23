const express = require("express");
const router = express.Router();

const {
    addToCart,
    getCart,
    updateQuantity,
    removeFromCart
} = require("../controllers/Cart");

//routes for the cart
router.post("/add", addToCart);
router.post("/", getCart);
router.put("/update/", updateQuantity);
router.delete("/remove/", removeFromCart);

module.exports = router;