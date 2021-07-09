var Post = require('../models/Post');

exports.indexAction = (req, res) => {
    Post.find({},(err, posts)=> {
        res.render('./blog/index', {posts: posts});
    })
};

exports.readPost = function(req, res) {
    var id = req.params.id;
    Post.findOne({_id: id}).populate("comments").exec(function(err, post) {
        if(err) {
            console.log(err);
        } else {
            res.render('./blog/read', {post: post});
        }
    });
};

exports.showCreateForm = function(req, res) {
    res.render('../views/blog/create');
};

exports.showUpdateForm = function(req, res) {
    var id = req.params.id;
    Post.findById(id, function(err, post) {
        if(err) {
            console.log(err);
        } else {
            res.render('../views/blog/update', {post: post});
        }
    });
};

exports.updatePost = (req, res) => {
    var id = req.params.id;
    var title = req.body.title;
    var content = req.body.content;
    Post.findByIdAndUpdate(id, { title: title, content: content}, (err, post) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/blog');
        }
    });
};

exports.saveNewPost = (req, res) => {
    var title = req.body.title;
    var content = req.body.content;
    var username = req.user.username;
    console.log(req.user);
        Post.create({
            title: title,
            author: username,
            content: content,
            created_at: Date()
        }, (err, post) => {
            if(err) {
                console.log(err);
            } else {
            res.redirect('/blog');
            }
        });
};

exports.deletePost = function(req, res) {
    var id = req.params.id;
    Post.findByIdAndRemove({_id: id}, function(err, result){
        if(err) {
            console.log(err);
        } else {
            res.redirect('/blog');
        }
    });
};
//router.get('/page/:pageNum', postController.showPage);
exports.showPage = (req, res) => {
    var pageNum = req.params.pageNum;
    Post.find({}).limit(1).skip(pageNum-1).exec((err, posts) => {
        res.render('./blog/index', {posts: posts});
    });
 };
