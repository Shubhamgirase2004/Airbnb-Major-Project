const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReviews = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id; // Associate the review with the logged-in user
  
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created Successfully!");
  res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReviews = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted Successfully!");

  res.redirect(`/listings/${id}`);
}