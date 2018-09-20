const express    = require('express');
const router     = express.Router();
const User       = require('../models/User')
const bcrypt     = require('bcryptjs')
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const passport   = require('passport');
const ensureLogin =require('connect-ensure-login');
const uploadCloud = require('../config/cloudinary.js');
const Page = require('../models/page.js')


router.get('/signup', (req, res, next)=>{
    res.render('userViews/signup')
})
router.post('/signup', (req, res, next)=>{
    const username = req.body.username
    const password = req.body.password

    if (username === "" || password === "") {
        res.render("userViews/signup", {
          errorMessage: "Indicate a username and a password to sign up"
        });
        return;
      }

      User.findOne({ "username": username })
      .then(user => {
          if (user !== null) {
            res.render("userViews/signup", {
            errorMessage: "Sorry, that username already exists"
        });
        return;
        }

    const saltRounds = 10;
    const thePassword = req.body.password;
    const salt  = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(thePassword, salt);

    User.create({
        username: req.body.username,
        password: hash
    })
    .then((result)=>{
      console.log('####################',req.session.currentUser.username)
        res.redirect('/thanks');   ///
    })
    .catch((err)=>{
        next(err);
    })
  })
})



router.get('/thanks', (req, res, next)=>{
  // console.log("the user info from the thanks page #################### ", req.user);
  // User.findById(req.user)
  // .then(userFromDB => {
    console.log('####################supsupsupsupsupsupsupsupsup',User),
    res.render('userViews/thanks', {user: req.session.currentUser})
  // })
})






router.get('/login', (req, res, next)=>{
    res.render('userViews/login')
})

router.post('/login', (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;

      console.log("the user name from req body >>>>>>>>>>>>>>>> ", username);
    if (username === "" || password === "") {
        res.render("userViews/login", {
          errorMessage: "Oops, it look like you left one or more of the files blank, please fill in your username and password"
        });
        return;
      }

      User.findOne({ "username": username })
      .then(user => {
        console.log("the user info after finding it in db for log in ********************** ", user);
          if (!user) {
            res.render("userViews/login", {
              errorMessage: "Sorry, that username doesn't exist"
            });
            return;
          }
          if (bcrypt.compareSync(password, user.password)) {
            console.log("PW match and this is the user info on login after confirm of pw match ^^^^^^^^^^^^^^^^^^^^^^^^^^^", user);
            // Save the login in the session!
              req.session.currentUser = user;
// console.log('heeeeeeyyyyyyyyyyyyyyyy',user)
              res.redirect('/thanks');
           
          } else {
            res.render("userVews/login", {
              errorMessage: "Incorrect password"
            });
          }
      })
      .catch(error => {
        next(error)
      })
})


router.get('/pages/add', (req, res, next) => {
  res.render('userViews/page-add')
});


router.post('/page/add', uploadCloud.single('photo'), (req, res, next) => {
    console.log('=-=-=-=-=-=-=-=-=-=-=-',req.session)
    const { title, content } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    Page.create({title: title, content: content, imgName: imgName, imgPath: imgPath, userID:req.session.currentUser._id})
    .then(page => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
  });




router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
      // cannot access session here
      res.redirect("/login");
    });
  });

module.exports = router;