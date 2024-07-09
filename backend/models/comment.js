const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
    body: String
});

module.exports = mongoose.model("Comment", CommentSchema);