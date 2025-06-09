const express = require('express');
const router = express.Router({mergeParams: true}); // Merge params to access listing ID
const wrapAsync = require ('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {listingSchema, reviewSchema} = require('../schema.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');

 const reviewsController = require('../controllers/reviews.js');
const review = require('../models/review.js');

//Reviews
router.post("/",
   isLoggedIn,
   validateReview,
   wrapAsync(reviewsController.createReviews));

//Delete Reviews

router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewsController.deleteReviews));

module.exports = router;