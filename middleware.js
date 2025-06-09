const Listing = require('./models/listing'); 
const Review = require('./models/review'); 
const { listingSchema, reviewSchema } = require('./schema.js'); // Assuming you have a Joi schema for validation
const ExpressError = require('./utils/ExpressError'); // Assuming you have a custom error class for handling errors

module.exports.isLoggedIn = (req, res, next) => {
     if(!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl; // Store the original URL to redirect after login
    req.flash('error', 'You must be logged in to create a listing');
    return res.redirect('/login');
  }
  next();
}


module.exports.savedRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl; // Make the redirect URL available in views
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)) { // ✅ Fixed: Use req.user instead of res.locals.currUser
      req.flash("error","You are not Owner of this listing!");
      return res.redirect(`/listings/${id}`); // ✅ Added return to stop execution
    }
  next();
}

module.exports.validateListing = (req, res, next) => {
  let {error} = listingSchema.validate(req.body);
  if (error) {
    let errMessage = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMessage);
    } else {
      next();
    }
  };

  module.exports.validateReview = (req, res, next) => {
  let {error} = reviewSchema.validate(req.body);
  if (error) {
    let errMessage = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMessage);
    } else {
      next();
    }
  };

  
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
    let review = await Review.findById( reviewId);
    if (!review.author.equals(res.locals.currUser._id)) { // ✅ Fixed: Use req.user instead of res.locals.currUser
      req.flash("error","You are not Author of this Review!");
      return res.redirect(`/listings/${id}`); // ✅ Added return to stop execution
    }
  next();
}