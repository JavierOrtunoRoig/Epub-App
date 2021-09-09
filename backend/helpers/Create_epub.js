const epub = require('epub-gen');
const fs = require('fs');

/**
 * 
 * @param {string} title 
 * @param {string} name 
 */
const createEpub = async (title, name) => {

    const content = JSON.parse(fs.readFileSync(`textos/${name}.json`, { encoding: 'utf-8' }));

    const options = {
        title: title,
        author: 'Unknow',
        output: title,
        content: content
    };

    new epub(options).promise.then(() => console.log('Done'));
}

module.exports = {
    createEpub
}
