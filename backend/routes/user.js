const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.get('/current', UserController.current_user_details);

module.exports = router;