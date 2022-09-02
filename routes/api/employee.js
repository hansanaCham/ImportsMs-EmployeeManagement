const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
// @route GET api/employee
//@dec Test Route
//@access Public
router.get('/', auth, (req, res) => res.send('Employee route'));
module.exports = router;
