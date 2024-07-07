const Post = require("../models/post");
const Comment = require("../models/comment");

exports.posts_list = async (req, res) => {
    const all_posts = await Post.find().populate("comments").exec();
    res.send({
        all_posts: Array.from(all_posts)
    });
};