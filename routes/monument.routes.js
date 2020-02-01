const { Router } = require("express");
const { check, validationResult } = require('express-validator');

const Monument = require('../models/Monument');

const Region = require('../models/Region');

const router = Router();

router.get("/",async (req, res) => {
  try {
    await Monument.find().populate('region').then(monuments => {
      res.render("list", { monuments });
    }).catch(()=>{
      res.render('500');
    });
  } catch (error) {
    res.render('500');
  }
});

router.get("/add",async (req, res) => {
  try {
    await Region.find().then(regions=>{
      res.render("add", { errors: [] , regions});
    })
  } catch (error) {
    res.render('500');
  }
});

router.post('/add', [
  check('name', "Введите имя памятника").not().isEmpty(),
  check('region', 'Выбирите местоположение памятника').not().isEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await region.find().then(regions=>{
        res.locals.get = function() {
          var args = Array.prototype.slice.call(arguments, 0);
          var path = args[0].split('.');
          var root = this;
          for (var i = 0; i < path.length; i++) {
              if(root[path[i]] === void 0) {
                  return args[1]?args[1]:null;
              } else {
                  root = root[path[i]];
              }
          };
          return root;
      }
        return res.status(400).render('add', { errors: errors.array(),regions });
      })

    }
    const monument = new Monument(req.body);
    monument.save();
    res.redirect('/');
  } catch (error) {
    res.render('500');
  }
})

router.get("/edit/:id",async (req, res) => {
  try {
    await Region.find().then(regions=>{
      Monument.findById(req.params.id).then((data) => {
        res.render('edit', { data, errors: [], regions });
      }).catch(()=>{
        res.render('404')
      })
    })
  } catch (error) {
    res.render('500');
  }
});

router.post('/edit/:id', [
  check('name', "Введите имя памятника").not().isEmpty(),
  check('region', 'Введите местоположение памятника').not().isEmpty()
], async (req, res) => {
  try {
    await Monument.findById(req.params.id).then(data => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('edit', { data, errors: errors.array() });
      }
    }).catch(()=>{
      res.render('404')
    })
   await Monument.findByIdAndUpdate(req.params.id,req.body).then(()=>{
      res.redirect('/');
    })
  } catch (error) {
    res.render('500');
  }
})


router.get("/delete/:id",async (req, res) => {
  try {
    await Monument.findByIdAndDelete(req.params.id).then(() => {
      res.redirect('/')
    }).catch(()=>{
      res.render('404')
    })
  } catch (error) {
    res.render('500');
  }
});

module.exports = router;
