const authenticateToken = require("../middlewares/authenticate");

exports.display_protected_message = [
    authenticateToken,
    (req, res) => {
        res.send({
            msg: "This is a protected message."
        });
    }
];