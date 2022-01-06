const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { validationResult } = require('express-validator');
require('dotenv').config();
const User = require('../models/User');


exports.SignUp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      if (await User.findOne({ email })) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // Register new user
      const user = new User({
        name,
        email,
        avatar: gravatar.url(email, { s: '200', r: 'pg', d: 'mm' }),
        password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
      });

      await user.save();

      // Return jsonwebtoken
      jwt.sign(
        {
          user: {
            id: user.id,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
}

exports.Login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials' }],
        });
      }

      // Check for email and password match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials' }],
        });
      }

      // Return jsonwebtoken
      jwt.sign(
        {
          user: {
            id: user.id,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
