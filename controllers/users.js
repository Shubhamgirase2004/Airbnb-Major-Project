const User = require('../models/user');

module.exports.renderSignupForm = (req, res) => {
    res.render('users/signup');
};

module.exports.signup = async (req, res) => {
        try {
             let {username, email, password } = req.body;
            const newUser = new User({ username, email });
            const registeredUser = await User.register(newUser, password);
            console.log(registeredUser);
            req.login(registeredUser, (err) => {
                if (err) {
                    return next(err);
                }
                 req.flash('success', 'Welcome to the Wanderlust!');
                 res.redirect('/listings');
            });
           
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('/signup');
        }   
    }

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
};

module.exports.login = async (req, res) => {
    req.flash("success","Welcome back !");
    let redirectUrl = res.locals.redirectUrl || '/listings'; // Use the saved redirect URL or default to '/listings'
    res.redirect(redirectUrl );
  };

module.exports.logout =  (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged Out Succesful!');
        res.redirect('/listings');
    });
}