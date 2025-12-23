const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1, guestSessionId } = req.body;
    const userId = req.user?._id; // from auth middleware (if logged in)

    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // 1️⃣ Find cart (user OR guest)
    let cart = await Cart.findOne(
      userId
        ? { user_id: userId }
        : { guestSessionId }
    );

    // 2️⃣ Create cart if not exists
    if (!cart) {
      cart = new Cart({
        user_id: userId || null,
        guestSessionId: userId ? null : guestSessionId,
        products: [],
      });
    }

    // 3️⃣ Check if product exists
    const productIndex = cart.products.findIndex(
      (p) => p.product_id.toString() === product_id
    );

    if (productIndex > -1) {
      // Increase quantity
      cart.products[productIndex].quantity += quantity;
    } else {
      // Add new product
      cart.products.push({ product_id, quantity });
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

const getCart = async (req, res) => {
  try {
    const guestSessionId = req.guestSessionId;
    const userId = req.userId;

    const cart = await Cart.findOne(
      guestSessionId
        ? { guestSessionId } : { user_id: userId }
    ).populate("products.product_id");

    res.json(cart || { products: [] });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

const updateQuantity = async (req, res) => {
  const { product_id, quantity, guestSessionId } = req.body;
  const userId = req.user?._id;

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be >= 1" });
  }

  const cart = await Cart.findOne(
    userId
      ? { user_id: userId }
      : { guestSessionId }
  ).populate("products.product_id");

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const product = cart.products.find(
    (p) => p.product_id._id.toString() === product_id
  );

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  product.quantity = quantity;
  await cart.save();

  res.json(cart);
};

const removeFromCart = async (req, res) => {
  const { product_id, guestSessionId } = req.body;
  const userId = req.user?._id;

  const cart = await Cart.findOne(
    userId
      ? { user_id: userId }
      : { guestSessionId }
  ).populate("products.product_id");

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.products = cart.products.filter(
    (p) => p.product_id._id.toString() !== product_id
  );

  await cart.save();

  res.json(cart);
};

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
};