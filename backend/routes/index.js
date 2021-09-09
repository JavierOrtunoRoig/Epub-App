const express = require('express');
const { devilnovel } = require('../models/devilnovel');

const router = express.Router();

/* GET home page. */
router.get('/api/devilnovel', devilnovel);

module.exports = router;
