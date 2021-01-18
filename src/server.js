const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const router = require("../router/abbrRouter");

require("dotenv").config();

const app = express();

//db setup
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("local mongoDB server connected"))
  .catch((err) => console.log(err));

//router

//middleware
app.use(express.json());
app.use("/.netlify/functions/server", router);

// app.listen(process.env.PORT, () =>
//   console.log(`server starts at ${process.env.PORT}`)
// );

module.exports.handler = serverless(app);
