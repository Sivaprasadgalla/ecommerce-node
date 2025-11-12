const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    total_price: {
        type: Number,
        required: [true, "Please add the total price for the order"]
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    }
}, 
{
    timestamps: true,
}
);  

module.exports = mongoose.model("Order", OrderSchema);