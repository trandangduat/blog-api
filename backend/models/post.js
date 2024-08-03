const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    date: { type: Date, default: Date.now },
    thumbnail: String,
    body: String,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
}, {
    toJSON: {virtuals: true}
});

PostSchema.virtual("url").get(function() {
    return `/post/${this._id}`
});

module.exports = mongoose.model("Post", PostSchema);
