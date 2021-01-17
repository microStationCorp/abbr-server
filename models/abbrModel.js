const mongoose = require("mongoose");

const abbrSchema = new mongoose.Schema({
  shortForm: {
    type: String,
    required: true,
  },
  fullForm: {
    type: String,
    required: true,
  },
});

module.exports = ABBr = mongoose.model("abbr", abbrSchema);
