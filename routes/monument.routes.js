const { Router } = require("express");
const { check, validationResult } = require("express-validator");

const Monument = require("../models/Monument");

const Region = require("../models/Region");

const Condition = require("../models/Condition");

const router = Router();

router.get("/", async (req, res) => {
  try {
    await Monument.find()
      .populate("region")
      .populate("condition")
      .then(monuments => {
        res.render("list", { monuments });
      })
      .catch(error => {
        res.render("500");
      });
  } catch (error) {
    res.render("500");
  }
});

router.get("/add", async (req, res) => {
  try {
    const regions = await Region.find();
    const conditions = await Condition.find();
    res.render("add", { errors: [], regions, conditions });
  } catch (error) {
    res.render("500");
    console.log(error.message);
  }
});

router.post(
  "/add",
  [
    check("name", "Введите имя памятника")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const regions = await Region.find();
        const conditions = await Condition.find();
        return res
          .status(400)
          .render("add", { errors: errors.array(), regions, conditions });
      }
      const monument = new Monument(req.body);
      monument.save();
      res.redirect("/");
    } catch (error) {
      res.render("500");
    }
  }
);

router.get("/edit/:id", async (req, res) => {
  try {
    const regions = await Region.find();
    const conditions = await Condition.find();
    await Monument.findById(req.params.id)
      .then(data => {
        res.render("edit", { data, errors: [], regions, conditions });
      })
      .catch(error => {
        res.render("404");
      });
  } catch (error) {
    res.render("500");
  }
});

router.post(
  "/edit/:id",
  [
    check("name", "Введите имя памятника")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      await Monument.findById(req.params.id)
        .then(data => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res
              .status(400)
              .render("edit", { data, errors: errors.array() });
          }
        })
        .catch(() => {
          res.render("404");
        });
      await Monument.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
          res.redirect("/");
        })
        .catch(error => {
          res.render("404");
        });
    } catch (error) {
      res.render("500");
    }
  }
);

router.get("/delete/:id", async (req, res) => {
  try {
    await Monument.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect("/");
      })
      .catch(() => {
        res.render("404");
      });
  } catch (error) {
    res.render("500");
  }
});

module.exports = router;
