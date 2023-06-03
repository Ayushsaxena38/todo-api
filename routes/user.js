const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('../config/passport-jwt-strategy');
const userController = require('../controllers/user');


router.post('/signup',userController.signup);
router.get('/login',userController.login);
// router.get('/checklogin',passport.authenticate('jwt',{session : false}),userController.checklogin);
router.get('/checklogin',passport.authenticate('jwt',{session : false}), userController.checklogin);

module.exports = router;