const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.signup = [
    body("username", "Username must have at least one character.")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("password", "Password must have at least one character.")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("confirm-password", "Passwords do not match.")
        .trim()
        .escape()
        .custom((value, {req}) => {
            return (value === req.body.password);
        }),
    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                username: req.body.username,
                password: hashedPassword
            });
            await user.save();
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '2h'});
            res.send({
                msg: "SIGNED UP",
                token
            });
        } else {
            res.send(errors);
        }
    }
];