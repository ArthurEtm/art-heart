
const express      = require('express');
const router       = express.Router();
const Picture    = require('../models/Picture');
const Page       = require('../models/Page');
router.get('/pages', (req, res, next) => {
    Page.find()
    .then((listOfPages)=>{
        res.json(listOfPages)
    })
    .catch((err)=>{
        res.json(err);
    })
});
router.post('/pages/create', (req, res, next)=>{
    Page.create({
        title: req.body.title,
        genre: req.body.genre,
        image: req.body.image
    })
    .then((response)=>{
        res.json(response);
    })       
    .catch((err)=>{
        res.json(err);
    })
});





module.exports = router;