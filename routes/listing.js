const express = require('express');
const router = express.Router();
const wrapAsync = require ('../utils/wrapAsync.js');
const { listingSchema, reviewSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');

const listingsController = require('../controllers/listings.js');
const multer = require('multer');
const { cloudinary, storage } = require('../cloudconfig.js'); // Import cloudinary configuration
const upload = multer({ storage }); // Set up multer for file uploads

//index and create route in compact  form
router
.route('/')
.get( wrapAsync(listingsController.index)) // Index route
.post(
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingsController.createListing)
);



// 2. New route
router.get('/new',
   isLoggedIn,listingsController.renderNewForm);  

// 3. Show route
router.get('/:id',
    wrapAsync(listingsController.showListing));



// 5. Edit route
router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.renderEditForm));


// 6. Update (PUT) route — ✅ fixed
// Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingsController.updateListing)
);

// 7. Delete route
router.delete("/:id",
  isLoggedIn,
  isOwner,
   wrapAsync(listingsController.deleteListing));

module.exports = router;