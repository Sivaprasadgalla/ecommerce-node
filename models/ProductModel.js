const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the product name"]
    },
    description: {
        type: String,
        required: [true, "Please add the product description"]
    },
    price: {
        type: Number,
        required: [true, "Please add the product price"]
    },
    image: { 
        type: String, 
        required: [true, "Please add the product image"]
    },
    stock: { 
        type: Number, 
        default: 0 
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, 
{
    timestamps: true,
}
);  

module.exports = mongoose.model("Product", ProductSchema);