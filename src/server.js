const express = require("express");
const mongoose = require("mongoose");
const router = require("../router/abbrRouter");

require("dotenv").config();

const app = express();

//db setup
mongoose
  .connect(process.env.MONGO_URI, {
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
app.use("/api", router);

app.listen(process.env.PORT || 5000, () =>
  console.log(`server starts at ${process.env.PORT}`)
);
