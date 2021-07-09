var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    text: String,
    author: String,
    created_at: Date
});

module.exports = mongoose.model('Comment', commentSchema);

