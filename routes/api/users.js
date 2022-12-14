const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');
// @route GET api/users
//@dec Test Route
//@access Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('userType', 'User type is required').not().isEmpty(),
    check('email', 'Please include a vaid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, userType } = req.body;

    try {
      // sea user exist
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //get user gravator

      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

      user = new User({
        name,
        email,
        avatar,
        password,
        userType,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSectet'),
        { expiresIn: 360000 },
        (err, token) => {
          res.json({
            token,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
