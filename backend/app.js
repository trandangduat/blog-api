const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DATABASE_URL);
}

const indexRouter = require("./routes/index");
const app = express();

app.use(cors());
app.use('/', indexRouter);

app.listen(3000, () => console.log("Listening on port 3000!"));