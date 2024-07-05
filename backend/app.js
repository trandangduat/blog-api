const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

const indexRouter = require("./routes/index");
const app = express();

app.use('/', indexRouter);

app.listen(3000, () => console.log("Listening on port 3000!"));