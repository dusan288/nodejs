var passport = require('passport');
var User = require('../models/User');

exports.logIn = function(req, res, next) {
    passport.authenticate('local', function(err, user, loginErr ){
        if(!user){

            console.log("Authentication failed");
            return res.render("./auth/login", {message: "Wrong credentials!"});
        }
        if(loginErr) {
            console.log(loginErr.message);
            res.send(loginErr.message);
        }
        req.login(user, loginErr => {
        if (loginErr) {
            return next(loginErr);
        }
        return res.redirect('/blog');
        });      
    })(req, res, next);
}

exports.register = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var newUser = new User({username: username});
    User.register(newUser, password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate('local')(req, res, function(){
            res.redirect('/blog');
            });
        }
    })

}

exports.logOut = function(req, res) {
    req.logout();
    res.redirect('/blog');
}

exports.showLogin = function(req, res) {
    res.render('./auth/login');
}

exports.showRegister = function(req, res) {
    res.render('./auth/register');
}