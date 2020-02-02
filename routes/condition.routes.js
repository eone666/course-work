const { Router } = require("express");
const { check, validationResult } = require("express-validator");

const Condition = require("../models/Condition");

const router = Router();

router.get("/", async (req, res) => {
  try {
    await Condition.find().then(data => {
      res.render("settings", { h1:'Состояния', route:'conditions', errors: [], data });
    });
  } catch (error) {
    res.render("500");
  }
});

router.post(
  "/",
  [
    check("name", "Введите название состояния")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      Condition.find().then(data => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res
            .status(400)
            .render("settings", { h1:'Регионы',route:'conditions',errors: errors.array(), data });
        }
        const condition = new Condition(req.body);
        condition.save();
        res.redirect(`/conditions`);
      });
    } catch (error) {
      res.render("500");
    }
  }
);

router.get("/delete/:id", async (req, res) => {
    try {
      await Condition.findByIdAndDelete(req.params.id).then(()=>{
          res.redirect('/conditions');
      });
    } catch (error) {
      res.render("500");
    }
  });

module.exports = router;
