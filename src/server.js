const express = require("express");
const mongoose = require("mongoose");
const router = require("../router/abbrRouter");
const adminRouter = require("../router/adminRouter");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Set up a whitelist and check against it:
var whitelist = [
  "http://localhost:3000",
  "https://microstationcorp.github.io/abbr-client/",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());

//db setup
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoDB server connected"))
  .catch((err) => console.log(err));

//router
app.use("/abbrserver/api", router);
app.use("/abbrserver/admin", adminRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server starts at ${PORT}`));
