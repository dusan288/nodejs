var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/authController');


router.get('/login', authCtrl.showLogin);
router.post('/login', authCtrl.logIn);

router.get('/register', authCtrl.showRegister);
router.post('/register', authCtrl.register);

router.get('/logout', authCtrl.logOut);

module.exports = router;