const mongoose = require("mongoose");

const abbrSchema = new mongoose.Schema({
  shortForm: {
    type: String,
    required: true,
  },
  fullForm: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = Abbr = mongoose.model("abbr", abbrSchema);
