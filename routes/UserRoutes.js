const express = require("express");
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser 
} = require("../controllers/Users");
const {validateAccessToken, validateAdmin} = require("../middleware/authMiddleware");


//routes for the contacts
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/new", validateAccessToken, validateAdmin, createUser);
router.get("/", validateAccessToken, validateAdmin, getUsers);
router.get("/:id", validateAccessToken, validateAdmin, getUser);
router.put("/update/:id", validateAccessToken, validateAdmin, updateUser);
router.delete("/delete/:id", validateAccessToken, validateAdmin, deleteUser);

module.exports = router;