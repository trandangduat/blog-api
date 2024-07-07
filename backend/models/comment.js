const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: { type: mongoose.ObjectId, ref: "Post" },
    user: { type: mongoose.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
    body: String
});

module.exports = mongoose.model("Comment", CommentSchema);