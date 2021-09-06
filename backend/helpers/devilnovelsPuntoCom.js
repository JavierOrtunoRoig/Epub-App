const puppeteer = require('puppeteer');

const fs = require('fs');

/**
 * 
 * @param {string} url 
 * @param {number} numberChapter 
 */
const downloadDevilnovelsChapter = async (url, numberChapter) => {

    let it = 1;

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {

        return {
            width: 600,
            height: 600,
            deviceScaleFactor: window.devicePixelRatio
        };

    });

    await page.setViewport(dimensions);
    await page.goto(url);

    const capitulos = [];
    await page.waitForSelector('a');

    while (it <= numberChapter) {

        try {

            const titulo = await page.$eval('h1', (t) => {

                return t.innerHTML;

            });

            let texto = await page.$$eval('.entry-content > p', (t) => {

                let ret = '';

                for (let i = 1; i < t.length; i++) {

                    ret += t[i].outerHTML;

                }

                return ret;

            });

            texto += await page.$$eval('.entry-content > div', (t) => {

                let ret = '';

                for (let i = 1; i < t.length; i++) {

                    const aux = t[i].outerHTML;
                    if (!aux.includes('Bookmark')) {

                        ret += aux;

                    }

                }

                ret = ret.replaceAll('<div>', '<p>');
                ret = ret.replaceAll('<div />', '<p/>');
                ret = ret.replaceAll('<div />', '<p/>');

                return ret;

            });

            const capitulo = {
                title: titulo,
                data: texto
            };

            console.log(capitulo.title);

            capitulos.push(capitulo);

            it++;

            url = await page.$$eval('a[href^="https://devilnovels.com/emperors-domination/"]', (t) => {

                if (t.find(enlace => enlace.href.includes('comme'))) {

                    return t[3].href;

                } else {

                    return t[2].href;

                }

            });

            await page.goto(url);

        } catch (e) {

            console.log(e);

        }

    }

    console.log('fin');

    fs.writeFileSync('texto.json', JSON.stringify(capitulos), { encoding: 'utf-8' });

    browser.close();

};

module.exports = {
    downloadDevilnovelsChapter
}