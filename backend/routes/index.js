const express = require("express");
const router = express.Router();
const User = require("../models/user")
const Post = require("../models/post");
const Comment = require("../models/comment"); 

router.get('/', async (req, res) => {
    // const user = await User.find({}).exec();
    // const post = new Post({
    //     title: "Post 1",
    //     date: Date.now(),
    //     body: "Hello world! <b> bold </b>",
    // });
    // const comment = new Comment({
    //     post,
    //     user: user[0],
    //     body: "test comment" 
    // });
    // await comment.save();
    // post.comments.push(comment);
    // await post.save();

    const allPosts = await Post.find({}).populate("comments").exec();
    console.log(allPosts[0]);
    res.send({ msg: "hiii", });
});

module.exports = router;