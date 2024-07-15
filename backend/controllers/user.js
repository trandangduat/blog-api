const authenticateToken = require("../middlewares/authenticate");

exports.current_user_details = [
    authenticateToken,
    async (req, res) => {
        res.send(req.user);
    }
];