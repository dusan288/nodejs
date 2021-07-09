var Comment = require('../models/Comment');
var Post    = require('../models/Post');

var commentService = function(){};

commentService.prototype.saveComment = (postId, author, text, res) => {
    var newComment = new Comment({
        author: author,
        text: text
    });
    newComment.save();
    Post.findOne({_id: postId}, function(err, post) {
        post.comments.push(newComment);
        post.save(function(err, updatedPost) {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/blog/read/'+postId);
            }
        });
    });
}; 


module.exports = new commentService();