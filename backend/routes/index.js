const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get('/', async (req, res) => {
    const post = new Post({
        title: "New title",
        date: new Date(),
        content: "hiiiiiiiiiii i love u"
    });
    await post.save();
    res.send({ msg: "hii", });
});

module.exports = router;