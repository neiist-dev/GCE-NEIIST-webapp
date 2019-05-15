const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');
const filesBasePath = path.join(__dirname, '../files/Thesis/');
const fileServices = require('../services/file-services');

//TODO test situations with high t number (ex. more than 2 digits)
describe('LatestId', () => {
    it('Should get latestId == 0', async () => {
        expect(await fileServices.getCurrentRawHTMLFileId('test')).to.equal(0);
    });

    it('Should get latestId == 1', async () => {
        fs.open(filesBasePath + 'test01.html', 'w', function (err, file) {
            if (err) throw err;
            console.log('Saved!');
        });

        fs.open(filesBasePath + 'test02.html', 'w', function (err, file) {
            if (err) throw err;
            console.log('Saved!');
        });
        expect(await fileServices.getCurrentRawHTMLFileId('test')).to.equal(1);
        try {
            fs.unlinkSync(filesBasePath + 'test01.html');
            console.log('Removed!');
        } catch(err) {
            console.error(err)
        }
        try {
            fs.unlinkSync(filesBasePath + 'test02.html');
            console.log('Removed!');

        } catch(err) {
            console.error(err)
        }
    });

    it('Should get latestId == 2', async () => {
        fs.open(filesBasePath + 'test03.html', 'w', function (err, file) {
            if (err) throw err;
            console.log('Saved!');
        });

        fs.open(filesBasePath + 'test02.html', 'w', function (err, file) {
            if (err) throw err;
            console.log('Saved!');
        });
        expect(await fileServices.getCurrentRawHTMLFileId('test')).to.equal(2);

        try {
            fs.unlinkSync(filesBasePath + 'test02.html');
            console.log('Removed!');
        } catch(err) {
            console.error(err)
        }
        try {
            fs.unlinkSync(filesBasePath + 'test03.html');
            console.log('Removed!');

        } catch(err) {
            console.error(err)
        }

    });



});