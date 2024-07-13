const Post = require("../models/post");

exports.posts_list = [
    async (req, res) => {
        const all_posts = await Post.find().exec();
        res.send({
            all_posts: Array.from(all_posts),
            user: req.user
        });
    }
];