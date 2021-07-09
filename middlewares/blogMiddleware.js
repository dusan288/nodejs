var Post = require('../models/Post');

exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.redirect('/auth/login');
    } else {
        next();
    }
}

exports.isAuthor = (req, res, next) => {
    var postId = req.params.id;
    var username = req.user.username;
    Post.findById(postId, (err, post) => {
        if(err) {
            console.log(err);
        }
        else {
            if(username != post.author){
                return res.send('Action not allowed, you are not author');
            } else {
                next();
            }
        }
    })
}

