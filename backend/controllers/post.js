const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
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
        const { title, body } = req.body;
        const post = new Post({
            title,
            body,
        });
        await post.save();
        res.send({
            msg: "POST CREATED!"
        });
    }
];

exports.post_details = [
    async (req, res) => {
        const post = await Post.findById(req.params.id).exec();
        const { title, date, body } = post;
        res.send({
            title,
            body,
            date
        });
    }
];

exports.post_comments = [
    async (req, res) => {
        const post = await Post.findById(req.params.id)
                               .populate({
                                    path: 'comments',
                                    populate: {
                                        path: 'user',
                                        select: '-password'
                                    }
                               })
                               .exec();
        const { comments } = post;
        res.send({
            comments
        });
    }
];

exports.new_comment = [
    async (req, res) => {
        const post = await Post.findById(req.params.id).exec();
        const comment = new Comment({
            post,
            user: req.body.userId,
            body: req.body.commentBody
        });
        await comment.save();
        post.comments.push(comment);
        await post.save();
        res.send({
            msg: "COMMENT CREATED"
        });
    }
];