const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");

router.get('/posts', PostController.posts_list);

module.exports = router;