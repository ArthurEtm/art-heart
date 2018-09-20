const express = require('express');
const router  = express.Router();
const Page = require('../models/page.js')
const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  Page.find()
  .then((pages) => {
    res.render('index', { pages });
  })
  .catch((error) => {
    console.log(error)
  })
});

router.get('/page/add', (req, res, next) => {
  res.render('page-add')
});



module.exports = router;
