const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post");
const ProtectedController = require("../controllers/protected");

router.get('/posts', PostController.posts_list);
router.get('/post/:id', PostController.post_details);
router.get('/post/:id/comments', PostController.post_comments);
router.get('/protected', ProtectedController.display_protected_message);
router.post('/post/create', PostController.new_post);

module.exports = router;