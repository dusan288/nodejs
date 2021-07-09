var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var User = require('../models/User');
var Comment = require('../models/Comment');
var commentService = require('../services/commentService');
var postController = require('../controllers/postController');
var commentController = require('../controllers/commentController');
var passport = require('passport');
var middlwr = require('../middlewares/blogMiddleware');

//use controllers:
router.get('/', postController.indexAction);

router.get('/new',middlwr.isLoggedIn, postController.showCreateForm);
//pagination - only back-end implemented
router.get('/page/:pageNum', postController.showPage);

router.post('/new', middlwr.isLoggedIn, postController.saveNewPost);

//Delete post route
router.get('/delete/:id', middlwr.isLoggedIn, middlwr.isAuthor, postController.deletePost);

//view single post route
router.get('/read/:id', postController.readPost);

router.get('/update/:id', middlwr.isLoggedIn, middlwr.isAuthor, postController.showUpdateForm);

router.post('/update/:id', middlwr.isLoggedIn, middlwr.isAuthor, postController.updatePost);
//save comment route 
router.post('/comment/:id', commentController.saveComment);

module.exports = router;