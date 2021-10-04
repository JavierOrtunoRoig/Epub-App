const fs = require('fs');

const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');

/**
 * 
 * @param {string} url 
 * @param {number} numberChapter 
 * @returns {number}
 */
const downloadDevilnovelsChapter = async (url, numberChapter) => {

    let { iteracion, page, browser } = await initialConfiguration(url);

    let capitulos = [];
    await page.waitForSelector('a');

    while (iteracion <= numberChapter) {

        ({ iteracion, capitulos } = await proccessPageInformation(page, iteracion, capitulos)); // reasing nar variables
    }

    console.log('fin');

    const id = uuidv4();
    fs.writeFileSync(`textos/${id}.json`, JSON.stringify(capitulos), { encoding: 'utf-8' });

    browser.close();

    return id;
};

const proccessPageInformation = async (page, iteracion, capitulos) => {

    try {

        const titulo = await getTitle(page);

        let texto = await getText(page);
        //texto += await completeText(page); a veces hay que comentarlo y otras veces no

        //console.log(texto);

        const capitulo = {
            title: titulo,
            data: texto
        };

        console.log(capitulo.title);

        capitulos.push(capitulo);
        iteracion++;

        const url = await nextUrl(page);
        if (url !== undefined) {
            console.log(url)
            await page.goto(url);
        }

    } catch (e) {
        console.log(e);
    }

    return {
        iteracion,
        capitulos
    }

}

const initialConfiguration = async (url) => {

    let iteracion = 1;

    const browser = await puppeteer.launch({
        //headless: false,
        args: [
            '--no-sandbox',
            //'--disable-setuid-sandbox',
        ]
    });
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

    return {
        browser,
        iteracion,
        page
    }
}

const getTitle = (page) => {
    return page.$eval('h1', (t) => {

        return t.innerHTML;

    });
}

/* const getText = (page) => {
    return page.$$eval('.entry-content > p', (t) => {

        let ret = '';

        for (let i = 1; i < t.length; i++) {

            ret += t[i].outerHTML;

        }

        return ret;

    });
} */

const getText = (page) => {
    return page.$$eval('.entry-content', (t) => {

        return t[0].outerHTML;

    });
}

const completeText = (page) => {
    return page.$$eval('.entry-content > div', (t) => {

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
}

const nextUrl = (page) => {
    //url = await page.$$eval('a[href^="https://devilnovels.com/emperors-domination/"]', (t) => {
    return page.$$eval('div > div > div.wp-post-navigation > div.wp-post-navigation-next > a', (t) => {

        if (t.length <= 1) {
            return t[0].href
        } else {

            if (t[3] === undefined) return

            if (t.find(enlace => enlace.href.includes('comme'))) {

                return t[3].href;

            } else {

                return t[2].href;

            }

        }


    });
}

module.exports = {
    downloadDevilnovelsChapter
}