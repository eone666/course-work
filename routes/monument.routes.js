const { Router } = require("express");
const { check, validationResult } = require('express-validator');

const Monument = require('../models/Monument')

const router = Router();

router.get("/", (req, res) => {
  try {
    const list = Monument.find().then(monuments => {
      res.render("list", { monuments });
    });
  } catch (error) {
    res.render('500');
  }
});

router.get("/add", (req, res) => {
  try {
    res.render("add", { errors: [] });
  } catch (error) {
    res.render('500');
  }
});

router.post('/add', [
  check('name', "Введите имя памятника").not().isEmpty(),
  check('region', 'Введите местоположение памятника').not().isEmpty()
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('add', { errors: errors.array() });
    }
    const monument = new Monument(req.body);
    monument.save();
    res.redirect(`/`);
  } catch (error) {
    res.render('500');
  }
})

router.get("/edit/:id", (req, res) => {
  try {
    Monument.findById(req.params.id).then((data) => {
      res.render('edit', { data, errors: [] });
    })
  } catch (error) {
    res.render('500');
  }
});

router.post('/edit/:id', [
  check('name', "Введите имя памятника").not().isEmpty(),
  check('region', 'Введите местоположение памятника').not().isEmpty()
], (req, res) => {
  try {
    Monument.findById(req.params.id).then(data => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('edit', { data, errors: errors.array() });
      }
    })
    Monument.findByIdAndUpdate(req.params.id,req.body).then(()=>{
      res.redirect('/');
    })
  } catch (error) {
    res.render('500');
  }
})


router.get("/delete/:id", (req, res) => {
  try {
    Monument.findByIdAndDelete(req.params.id).then(() => {
      res.redirect('/')
    })
  } catch (error) {
    res.render('500');
  }
});

module.exports = router;
