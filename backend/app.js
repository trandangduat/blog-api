const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DATABASE_URL);
}

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', indexRouter);
app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter)

app.listen(3000, () => console.log("Listening on port 3000!"));