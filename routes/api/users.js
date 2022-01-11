// const express = require('express');
// const router = express.Router();
// const auth = require('../../middlsware/auth');
// const { check, validationResult } = require('express-validator');
// require('dotenv').config();
// const authController = require('../../controllers/auth');


// Get users with email regex
// router.get('/:input', auth, async (req, res) => {
//   try {
//     const regex = new RegExp(req.params.input, 'i');
//     const users = await User.find({
//       email: regex,
//     }).select('-password');

//     res.json(users.filter((user) => user.id !== req.user.id));
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;