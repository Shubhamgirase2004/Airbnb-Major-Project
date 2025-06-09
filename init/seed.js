const mongoose = require('mongoose');
const Listing = require('../models/listing');
const User = require('../models/user'); // make sure this path is correct
const data = require('./data');
require('dotenv').config();

const dbUrl = process.env.ATLASDB_URL;

async function seedDB() {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ Connected to MongoDB");

    // Delete all listings before seeding new ones
    await Listing.deleteMany({});
    console.log("🗑️ Deleted all listings");

    // Find a user to assign as owner
    const owner = await User.findOne();
    if (!owner) {
      throw new Error("❌ No user found in the database. Please create a user first.");
    }

    // Attach owner to each listing
    const listingsWithOwner = data.map(listing => ({
      ...listing,
      owner: owner._id
    }));

    // Insert updated listings
    const insertedListings = await Listing.insertMany(listingsWithOwner);
    console.log(`✅ Successfully inserted ${insertedListings.length} listings`);

  } catch (err) {
    console.error("❌ Error during seeding:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 MongoDB connection closed");
  }
}

seedDB();
