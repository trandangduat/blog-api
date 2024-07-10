const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, authData) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        req.user = await User.findById(authData.userId);
        next();
    });
};

module.exports = authenticateToken;