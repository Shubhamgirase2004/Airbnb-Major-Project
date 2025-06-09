const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings }); 
}

module.exports.renderNewForm = (req, res) => {
  res.render('listings/new');
}

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({
    path: 'reviews',
    populate: {
      path: 'author',
    },
  })
    .populate("owner");
  if (!listing) {
    req.flash('error', 'Listing not found');
    res.redirect('/listings');
  }
  console.log(listing);
  res.render('listings/show', { listing });
}

module.exports.createListing = async (req, res, next) => {
    let responce = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();

     

      if (!responce.body.features[0]) {
      req.flash("error", "Invalid location");
      return res.redirect("/listings/new");
}

    console.log("Geometry:", responce.body.features[0].geometry);
    
    
   
  
   
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing); // ✅ First declare and initialize
    newListing.owner = req.user._id;
    newListing.image = { url, filename }; // ✅ Now modify its properties

    newListing.geometry = responce.body.features[0].geometry; // Add the geometry data to the listing

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created Successfully!");
    res.redirect("/listings");
};


  module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash('error', 'Listing not found');
    res.redirect('/listings');
  }
  res.render("listings/edit", { listing });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file!== 'undefined') {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename }; // Update the image field
      await listing.save(); // Save the updated listing
    }

    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
  }

  module.exports.deleteListing = async(req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
}