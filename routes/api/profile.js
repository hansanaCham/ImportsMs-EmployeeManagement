const express = require('express');
const router = express.Router();
// @route GET api/profile
//@dec Test Route
//@access Public
router.get('/', (req, res) => res.send('Profie route'));
module.exports = router;
