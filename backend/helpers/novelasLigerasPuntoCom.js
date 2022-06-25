const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');


const downloadNovelasLigeras = async (url, numberChapter) => {

  // creamos la configuración inicial de puppeteer
  let { iteration, page, browser } = await initialConfiguration(url);

  let capitulos = []; // Array con capitulos
  await page.waitForSelector('a'); // Esperamos a que se cargue la página para poder acceder a los elementos

  while (iteration <= numberChapter) { // Mientras no lleguemos al número de capítulos que queremos descargar seguimos iterando

    ({ iteration, capitulos } = await proccessPageInformation(page, iteration, capitulos, numberChapter)); // reasing nar variables
  }
  
  // Configuración final de la descarga de la novela (escritura del archivo) y cierre del navegador
  console.log('fin');

  const id = uuidv4();
  fs.writeFileSync(path.join(__dirname, `../textos/${id}.json`), JSON.stringify(capitulos), { encoding: 'utf-8' });

  browser.close();

  return id;
}

const initialConfiguration = async (url) => {

  let iteration = 1;

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
      iteration,
      page
  }
}

const proccessPageInformation = async (page, iteration, capitulos, numberChapter) => {

  try {

    const titulo = await getTitle(page);

    let texto = await getText(page);

    const capitulo = {
        title: titulo,
        data: texto
    };

    console.log(capitulo.title);

    capitulos.push(capitulo);
    iteration++;

    if (iteration <= numberChapter) {

      const url = await nextUrl(page);
      if (url !== undefined) {
          console.log(url)
          await page.goto(url);
      }
    }

  } catch (e) {
      console.log(e);
  }

  return {
    iteration,
    capitulos
  }
}

const getTitle = (page) => {

  return page.$eval('h1', (t) => { // con $ es un selector de un resultado, $$ es un selector de varios resultados

    return t.innerHTML;

  });
}

const getText = (page) => {

  return page.$$eval('.entry-content > p', (t) => {

    let ret = '';

    for (let i = 0; i < t.length; i++) {

        ret += t[i].outerHTML;

    }

    return ret;

  });
}


const nextUrl = (page) => {
  return page.$eval('.wp-post-navigation-next > a', (t) => t.href);
}

module.exports = {
  downloadNovelasLigeras
}