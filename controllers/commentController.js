var Comment = require('../models/Comment');
var Post = require('../models/Post');

exports.saveComment = function(req, res) {
    var postId = req.params.id;
    var author = req.body.author;
    var text = req.body.text;
    Post.findOne({_id: postId}, (err, post) => {
        if(err) {
            console.log(err);
            res.render('POST NOT FOUND');
        } else {
           var newComment = new Comment({author: author, text: text});
           newComment.save();
           post.comments.push(newComment);
           post.save((err, newpost) => {
               if(err) {
                   console.log(err);
               } else {
                   res.redirect('/blog/read/'+newpost._id);
               }
           });
        }
    });
}