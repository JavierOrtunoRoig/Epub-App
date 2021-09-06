const epub = require('epub-gen');
const fs = require('fs');

/**
 * 
 * @param {string} title 
 */
const createEpub = async (title) => {

    const content = JSON.parse(fs.readFileSync('texto.json', { encoding: 'utf-8' }));

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
