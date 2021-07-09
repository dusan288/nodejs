var mongoose = require('mongoose');
var Post = require('./models/Post');
var Comment = require('./models/Comment');
var User = require('./models/User');

var uri = 'mongodb://localhost/blog_db';

mongoose.connect(uri, {
  useMongoClient: true,
});
/*
//Remove all
User.remove({}, (err) => {
    if(err)
        console.log(err);
})

Post.remove({}, (err) => {
    if(err)
        console.log(err);
});

Comment.remove({}, (err) => {
    if(err)
        console.log(err);
});
console.log('Removed!');
*/
var admin = new User({
    username: 'admin',
});


var dusan = new User({
    username: 'dusan288'
});

User.register(admin, 'admin', (err, user) => {
    if(err) {
      console.log(err);
    } else {
        console.log('User saved!\n');
        console.log(user);
    }
});
User.register(dusan, 'dusan288', (err, user) => {
    if(err) {
      console.log(err);
    } else {
        console.log('User saved!\n');
        console.log(user);
    }
});

var comment = new Comment({
    author: 'User1',
    text: '100% agree!',
    created_at: Date() 
});


comment.save((err, savedComment) => {
    Post.create({
    title: 'Life is great',
    author: 'dusan288',
    content: 'Life is great, it is just beautiful',
    comments: [savedComment],
    created_at: Date()
    });
});

Post.create({
    title: 'Today was a good day',
    author: 'admin',
    content: 'Yes, what a great day was today',
    created_at: Date()
});

console.log('Seed complete');