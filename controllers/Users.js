const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /api/register 
const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password, role} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All the fields are required!");
    }
    const isUserAvailable = await User.findOne( {email} );
    if (isUserAvailable) {
        res.status(400);
        throw new Error("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password : hashedPassword,
        role: role || 'user'
    })
    if (user) {
        res.status(201).json({ message: "user registered successfully!", user:{_id: user._id, email: user.email }});
    } else {
        res.status(400);
        throw new Error("User data is not valid!");
    }
    res.status(200).json({ message: "user registered successfully!", contact});
});

//POST /api/login
const loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All the fields are required!");
    }
    const user = await User.findOne( {email} );
    const unHashedPasswrod = await bcrypt.compare(password, user.password);
    if (user && unHashedPasswrod) {
        const accessToken = jwt.sign({
            username: user.username,
            role: user.role,
            email: user.email,
            id: user.id
        }, 
        process.env.ACCESS_SECRET_TOKEN, 
        { expiresIn: "10d" }
    );
    res.status(200).json({message: "User logged in successfully!", user:{_id: user._id, role: user.role, email: user.email }, accessToken});
    } else {
        res.status(401);
        throw new Error("email or password is not valid!");
    }
});

const createUser = asyncHandler(async(req, res) => {
    // Implementation for creating a user
    const {username, email, password, role} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All the fields are required!");
    }
    const isUserAvailable = await User.findOne( {email} );
    if (isUserAvailable) {
        res.status(400);
        throw new Error("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password : hashedPassword,
        role: role || 'user'
    })
    if (user) {
        res.status(201).json({ message: "user created successfully!", user:{_id: user._id, email: user.email }});
    } else {
        res.status(400);
        throw new Error("User data is not valid!");
    }
});

const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({});
    res.status(200).json({ message: "Successfully fetched all the users", users });
});

const getUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({ message: "User fetched successfully", user });
});

const updateUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({ message: "User updated successfully", updatedUser });
});

const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
});

module.exports = {
    registerUser,
    loginUser,
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}