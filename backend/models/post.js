const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String},
    date: {type: Date},
    content: {type: String}
});

PostSchema.virtual("url").get(() => `/skin/${this._id}`);

module.exports = mongoose.model("Post", PostSchema);