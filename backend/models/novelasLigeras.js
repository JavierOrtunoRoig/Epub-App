const fs = require('fs');

const { createEpub } = require("../helpers/Create_epub");
const { downloadNovelasLigeras } = require('../helpers/novelasLigerasPuntoCom');


const novelasLigera = async (req, res) => {

    let { title, url, numberChapter } = req.query;

    title = title + '.epub';
    numberChapter = Number(numberChapter);

    const name = await downloadNovelasLigeras(url, numberChapter);
    await createEpub(title, name)

    await delay(5000)

    fs.unlinkSync(`textos/${name}.json`);

    res.download(title, title);
}

const delay = ms => new Promise(res => setTimeout(res, ms));


module.exports = {
  novelasLigera
}