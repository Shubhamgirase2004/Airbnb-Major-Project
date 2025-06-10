if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // Load environment variables from .env file
}


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const ejsMate = require('ejs-mate');
const path = require('path');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js'); // Assuming you have a User model


const dbUrl= process.env.ATLASDB_URL;

const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js'); // Assuming you have a user route

main()
.then(() => {
  console.log("Connected to MongoDB successfully");
})
.catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

async function main() {
    await mongoose.connect(dbUrl);
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret:process.env.SECRET,
  },
  touchAfter:24 * 3600,
});

store.on("error", () => {
  console.log("Error in MONGO SESSION STORE",err);
});

const sessionOptions = {
  store,
  secret : process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    httpOnly: true, // Helps prevent cross scripting attacks
  }
};

app.get('/', (req, res) => {
  res.redirect('/listings');
});



  app.use(session(sessionOptions));
  app.use(flash());

  // Initialize Passport.js
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user; // Make current user available in views
   
    // res.locals.error = req.flash('error');
   
    next();
  }
);

//demouser
// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student"
//   });

//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });



  app.use('/listings', listingRouter);
  app.use('/listings/:id/reviews', reviewRouter);
  app.use('/', userRouter); // Use the user router for user-related routes


  
  // app.all("*", (req, res) => {
  //   next(new ExpressError(404, "Page Not Found!"));
  // });



//  Error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong!' } = err;
  res.render("error.ejs", { message });
  // res.status(statusCode).send(message);
});



app.listen(8080, () => {
  console.log('Server is running on port 8080');
});