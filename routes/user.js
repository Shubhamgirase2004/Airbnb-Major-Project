const express = require('express');
const { route } = require('./listing');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { savedRedirectUrl } = require('../middleware.js');
const userController = require('../controllers/users.js');
const user = require('../models/user.js');


router.get('/signup', userController.renderSignupForm);

router.post(
    '/signup',
     wrapAsync(userController.signup));
        
router.get('/login',userController.renderLoginForm); 

router.post(
  "/login",
  savedRedirectUrl, // Middleware to save the redirect URL
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get('/logout',userController.logout);



module.exports = router;