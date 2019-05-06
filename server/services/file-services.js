const path = require('path');
const fs = require('fs');

const numberRegEx = /\D/g;
const filesBasePath= path.join(__dirname, '../files/Thesis/');

class FileServices {
    constructor() {
        this.getCurrentRawHTMLFileId = getCurrentRawHTMLFileId;
        this.getCurrentCurrentFileByFormat = getCurrentCurrentFileByFormat;
        this.getCurrentClassifierFileId = getCurrentClassifierFileId;
    }
}

let fileServices = module.exports = exports = new FileServices();

/**
 * Gets the lowest id from the array.
 * For instance, in an array [f1.html, t2.html, it returns 1.
 * @param {array} files - The array containing strings.
 */
function getLowestId (files) {
    return files.map(element => element.replace(numberRegEx,'')).reduce((min,value) => Math.min(min,value));
}

/**
 * Gets the latest id from files containing raw information concerning theses (f).
 *
 * @param {string} format - The format of the html file. Ex: when receiving t, format will be t[0-9].html
 */
async function getCurrentRawHTMLFileId ()   {
    const tFileRegEx = new RegExp('f' + '[0-9]{1,3}.html');
    const matchedFiles = fs.readdirSync(filesBasePath).filter(fn => tFileRegEx.test(fn));
    if (matchedFiles.length === 0)   {
        return 0;
    } else {
        return getLowestId(matchedFiles)
    }
}

async function getCurrentClassifierFileId ()   {
    const tFileRegEx = new RegExp('c' + '[0-9]{1,3}.json');
    const matchedFiles = fs.readdirSync(filesBasePath).filter(fn => tFileRegEx.test(fn));
    if (matchedFiles.length === 0)   {
        return 0;
    } else {
        return getLowestId(matchedFiles)
    }
}

async function getCurrentCurrentFileByFormat (format,extension)   {
    const tFileRegEx = new RegExp(format + '[0-9]{1,3}.' + extension);
    const matchedFiles = fs.readdirSync(filesBasePath).filter(fn => tFileRegEx.test(fn));
    if (matchedFiles.length === 0)   {
        return 0;
    } else {
        return getLowestId(matchedFiles)
    }
}
