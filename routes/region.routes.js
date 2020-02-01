const { Router } = require("express");
const { check, validationResult } = require("express-validator");

const Region = require("../models/Region");

const router = Router();

router.get("/", async (req, res) => {
  try {
    await Region.find().then(regions => {
      res.render("region", { errors: [], regions });
    });
  } catch (error) {
    res.render("500");
  }
});

router.post(
  "/",
  [
    check("name", "Введите название региона")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      Region.find().then(regions => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .render("region", { errors: errors.array(), regions });
        }
        const region = new Region(req.body);
        region.save();
        res.redirect(`/regions`);
      });
    } catch (error) {
      res.render("500");
    }
  }
);

router.get("/delete/:id", async (req, res) => {
    try {
      await Region.findByIdAndDelete(req.params.id).then(()=>{
          res.redirect('/regions');
      });
    } catch (error) {
      res.render("500");
    }
  });

module.exports = router;
