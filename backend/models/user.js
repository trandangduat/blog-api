const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String},
    password: {type: String}
});

UserSchema.virtual("url").get(() => `/user/${this._id}`);

module.exports = mongoose.model("User", UserSchema);