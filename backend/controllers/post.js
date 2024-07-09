const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

exports.posts_list = async (req, res) => {
    const all_posts = await Post.find()
                                .populate({
                                    path: 'comments', 
                                    populate: { path: 'user', select: '-password' }
                                })
                                .exec();
    res.send({
        all_posts: Array.from(all_posts)
    });
};