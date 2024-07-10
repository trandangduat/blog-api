const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.login = [
    body("username", "Username must have at least one character.")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("password", "Password must have at least one character.")
        .trim()
        .isLength({min: 1})
        .escape(),
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                res.status(401).send({ 
                    msg: "No matching username."
                });
                return;
            }
            const isPasswordMatched = await bcrypt.compare(password, user.password);
            if (!isPasswordMatched) {
                res.status(401).send({ 
                    msg: "Wrong password."
                });
                return;
            }
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '2h'});
            res.send({
                msg: "LOGGED IN",
                token
            });
        } else {
            res.send(errors);
        }
    }
];