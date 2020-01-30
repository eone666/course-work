const { Router } = require("express");

const Monument = require('../models/Monument')

const router = Router();

router.get("/", (req, res) => {
  res.render("articles-list");
});

router.get("/add", (req, res) => {
  
  res.render("monument-add");
});

router.post('/add', (req, res) => {
  const { name, region, creator, creadedDate, condition } = req.body;
  res.redirect('/monument');
})

router.get("/:id", (req, res) => {
    res.send(req.params.id);
});

module.exports = router;
