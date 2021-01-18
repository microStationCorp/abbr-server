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
router.post("/query", (req, res) => {
  const { queryData } = req.body;
  Abbr.find()
    .select("shortForm fullForm")
    .then((data) => {
      const newData = data.filter((d) =>
        d.shortForm.includes(queryData.toUpperCase())
      );
      res.json({
        result: newData.map((nd) => {
          return {
            _id: nd._id,
            sf: nd.shortForm,
            ff: nd.fullForm,
          };
        }),
      });
    })
    .catch((err) => res.json(err));
});

module.exports = router;
