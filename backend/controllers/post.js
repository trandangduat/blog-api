const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.posts_list = [
    async (req, res) => {
        const all_posts = await Post.find().exec();
        res.send({
            all_posts: Array.from(all_posts),
            user: req.user
        });
    }
];

exports.new_post = [
    async (req, res) => {
    }
];