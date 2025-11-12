const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

// GET /api/products
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({});
    res.status(200).json({ message: "Successfully fetched all the products", products });
});

// POST /api/products
const createProduct = asyncHandler(async(req, res) => {
    const {name, description, price, stock} = req.body;
    if(!name || !description || !price || !stock) {
        res.status(400);
        throw new Error("All the fields are required!");
    }
    const product = await Product.create({
        name,
        description,
        price,
        stock, 
        user_id: req.user.id
    })
    res.status(200).json({ message: "Created the product!", product});
});

const getProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json({ message: "Product fetched successfully", product });
});

const updateProduct = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({ message: "Product updated successfully", updatedProduct });
});

const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    await product.remove();
    res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
};