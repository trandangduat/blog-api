const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    date: { type: Date, default: Date.now },
    body: String,
    comments: [{ type: mongoose.ObjectId, ref: "Comment" }]
});

PostSchema.virtual("url").get(() => `/post/${this._id}`);

module.exports = mongoose.model("Post", PostSchema);