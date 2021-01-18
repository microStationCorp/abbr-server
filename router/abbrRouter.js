const router = require("express").Router();
const Abbr = require("../models/abbrModel");

//add new abbreviation
router.post("/add", (req, res) => {
  const { shortForm, fullForm } = req.body;

  const abbr = new Abbr({ shortForm: shortForm.toUpperCase(), fullForm });

  abbr
    .save()
    .then((d) => res.json(d))
    .catch((err) => res.json(err));
});

//get queried abbreviation
router.get("/query", (req, res) => {
  Abbr.find()
    .then((d) => {
      res.json(d);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
