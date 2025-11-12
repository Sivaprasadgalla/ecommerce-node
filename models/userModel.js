const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"]
    }, 
    email: {
        type: String,
        required: [true, "Please add the user email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, 
{
    timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);