const express      = require('express');
const router       = express.Router();
const picture    = require('../models/Picture');
const Page        = require('../models/Page');



/* GET home page */
router.get('/pages', (req, res, next) => {
    Page.find()
    .then((listOfPages)=>{

        console.log('=-=-=-=-=-=-=-=-=-', req.session)       
        res.render('pageViews/index', { theList: listOfpages, theUser: req.session.currentUser });
    })
    .catch((err)=>{
        next(err);
    })
    router.get('/page/add', (req, res, next) => {
        res.render('page-add')
      });
});

router.get('/pages/new', (req, res, next)=>{
    if(!req.session.currentUser){
        res.redirect('/pages')
        return
    }
    res.render('pageViews/create');
});


router.post('/pages/create', (req, res, next)=>{
    Page.create({
        title: req.body.title,
        genre: req.body.genre,
        image: req.body.image
    })
    .then((response)=>{
        res.redirect('/pages')
    })
    .catch((err)=>{
        next(err);
    })
});

router.post('/pages/delete/:id', (req, res, next)=>{

    Page.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.redirect('/pages')
    })
    .catch((err)=>{
        next(err)
    })
})

router.get('/pages/edit/:pageID', (req, res, next)=>{
    Page.findById(req.params.pageID)
    .then((thePage)=>{

        Picture.find()
        .then((listOfPics)=>{            
            res.render('PageViews/edit', {  thePage : thePage, thePics: listOfPics  });
        })
        .catch((err)=>{
            next(err)
        })
    })
    .catch((err)=>{
        next(err);
    })
})


router.post('/pages/update/:pageID', (req, res, next)=>{

    Page.findByIdAndUpdate(req.params.pageID, {
        title: req.body.title,
        genre: req.body.genre,
        image: req.body.image,
        $push: { cast: req.body.thePicture }
    })
    .then((response)=>{

        Picture.findByIdAndUpdate(req.body.thePicture,
            {$push: { pages: req.params.pageID }
        })
            .then((theResponse)=>{
                res.redirect('/pages/'+req.params.pageID)
            })
            .catch((err)=>{
                next(err)
            })
    })
    .catch((err)=>{
        next(err)
    })


})


router.get('/page/:theid', (req, res, next)=>{
    Page.findById(req.params.theid).populate('cast')
    .then((thePage)=>{
        res.render('pageViews/show', {page: thePage})
    })
    .catch((err)=>{
        next(err);
    });
});





router.get('/fancypage', (req, res, next)=>{
    res.render('pageViews/fancy.hbs');
})


module.exports = router;