const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');
const thesesServices = require('../services/theses-services');
const fileServices = require('../services/file-services');
const filesBasePath = path.join(__dirname, '../files/Thesis/');

//TODO lastest id must been arbitrary
//Creates classifier, based on
before (async () => {
    const latestId = await fileServices.getCurrentRawHTMLFileId();
    const classifier = await thesesServices.trainClassifier(1);
    await thesesServices.saveClassifier(classifier,latestId);
    console.log("Ran before")

});

//Deletes created classifier
after (async () =>  {
    const currentClassifierId = await fileServices.getCurrentClassifierFileId();
    try {
        fs.unlinkSync(filesBasePath + 'c' + currentClassifierId + '.json');
        console.log('Removed!');
    } catch(err) {
        console.error(err)
    }
    console.log("Ran after")
});

//TODO test situations with high t number (ex. more than 2 digits)
describe('Create classifier', () => {
    it('Should train and save classifier', async () => {
        const currentClassifierId = await fileServices.getCurrentClassifierFileId();
        expect(currentClassifierId).to.equal("1");

    });
});

describe('Should Classify A Thesis', () => {


    it('Should load classifier', async () => {
        const latestId = await fileServices.getCurrentRawHTMLFileId();
        const classifier = await thesesServices.loadClassifier(latestId);
        expect(classifier).to.not.be.null;
    });
    it('Should load theses', async () => {
        const latestId = await fileServices.getCurrentRawHTMLFileId();
        const theses = await thesesServices.loadTheses(latestId, null);
        expect(theses.length).to.equal(440);
    });

    it('Should classify title', async () => {
        const latestId = await fileServices.getCurrentRawHTMLFileId();
        const classifier = await thesesServices.loadClassifier(latestId);
        const theses = await thesesServices.loadTheses(latestId, null);
        const titledTheses = await thesesServices.classifyAux(theses,classifier);
        console.log(titledTheses);

    });
});