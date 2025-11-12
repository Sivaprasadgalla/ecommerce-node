const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateAccessToken = asyncHandler( async(req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized!");
            }
            req.user = decoded;
            next();
        })
    }

    if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
})

const validateAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
        throw new Error("User is not authorized as an admin!");
    }
}

module.exports = { validateAccessToken, validateAdmin };