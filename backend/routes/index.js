const express = require('express');
const { devilnovel } = require('../models/devilnovel');
const { novelasLigera } = require('../models/novelasLigeras');

const router = express.Router();

/* GET home page. */
router.get('/api/devilnovel', devilnovel);

router.get('/api/novelasligeras', novelasLigera);

module.exports = router;
