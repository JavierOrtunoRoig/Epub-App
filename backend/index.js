require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { downloadNovelasLigeras } = require('./helpers/novelasLigerasPuntoCom');
const { createEpub } = require('./helpers/Create_epub');

const app = express();

app.use(express.static('public'))

app.use(cors());

app.use('/', require('./routes/index'));

app.listen(process.env.PORT, () => {
    console.log('Server corriendo en puerto:', process.env.PORT);
});

//downloadNovelasLigeras("https://novelasligera.com/novela/legend-of-ling-tian/llt-001/", 585 );
/* createEpub('legend-of-ling-tian.epub', '95aa9804-26ea-4633-9eee-30a9e5a31b71')
    .then(() => console.log('Done')) */
//downloadNovelasLigeras("https://novelasligera.com/novela/the-strongest-system/tss-1-permiteme-subir-de-nivel/", 408 );
createEpub('The-Strongest-System.epub', '22742539-4f80-40cb-b541-27f4d0845aab')
    .then(() => console.log('Done')) 