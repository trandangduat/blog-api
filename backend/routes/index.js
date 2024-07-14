const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");
const ProtectedController = require("../controllers/protected");

router.get('/posts', PostController.posts_list);
router.post('/post/create', PostController.new_post);
router.get('/protected', ProtectedController.display_protected_message);

module.exports = router;