const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../../controllers/auth');


// Get authorized user
// router.get('/', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

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