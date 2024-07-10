const Post = require("../models/post");
const authenticateToken = require("../authenticate");

exports.posts_list = [
    authenticateToken,
    async (req, res) => {
        const all_posts = await Post.find().exec();
        res.send({
            all_posts: Array.from(all_posts),
            user: req.user
        });
    }
];