const mongoose = require("mongoose");
const Post = require("./models/post");
require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DATABASE_URL);
    const post = await Post.findById("669a5157d7dba75f7293f29b").exec();
    post.thumbnail = "https://github.com/trandangduat/car-dodge/raw/main/readme_assets/starting_screen.png";
    await post.save();

    mongoose.connection.close();
}
