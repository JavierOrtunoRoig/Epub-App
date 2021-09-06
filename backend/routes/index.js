const express = require('express');
const path = require('path');
const { createEpub } = require('../helpers/Create_epub');
const { downloadDevilnovelsChapter } = require('../helpers/devilnovelsPuntoCom');

const router = express.Router();

/* GET home page. */
router.get('/api/devilnovel', async (req, res) => {

    let { title, url, numberChapter } = req.query;

    title = title + '.epub';
    numberChapter = Number(numberChapter);

    //await downloadDevilnovelsChapter(url, numberChapter);
    //await createEpub(title)
    //await delay(3);

    res.download('a.txt', 'a.txt');
});

function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}

module.exports = router;
