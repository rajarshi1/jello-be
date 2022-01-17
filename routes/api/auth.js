const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../../middleware/auth');
const authController = require('../../controllers/auth');


//Get authorized user
router.get('/logged-in-user', auth, authController.getUser);

// Authenticate user & get token
router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists(),
  ], authController.Login
);


//Register user
router.post(
  '/signup',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
      min: 6,
    }),
  ],
  authController.SignUp
);


//create user from firebase auth
router.post(
  '/create-user',
  // [
  //   check('name', 'Name is required').not().isEmpty(),
  //   check('email', 'Please include a valid email').isEmail(),
  //   check('password', 'Please enter a password with 6 or more characters').isLength({
  //     min: 6,
  //   }),
  // ],
  authController.createUser
);

module.exports = router;