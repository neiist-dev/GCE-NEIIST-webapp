const sinon = require('sinon');
const natural = require("natural");
natural.PorterStemmer.attach();
const chai = require('chai');
const expect  = require('chai').expect;
const assert = require('chai').assert;
const CLASSIFICATOR_TYPE = 2;
const CLASS_TYPE = 5;
const CLASS_TYPE2 = 0;

const path = require('path');

const thesesClassifier = require('../services/thesis/bn.js');


beforeEach(function(){
    this.sandbox = sinon.createSandbox();
});

afterEach(function () {
    this.sandbox.restore();
});

let classifier = thesesClassifier.train(CLASSIFICATOR_TYPE);
describe('Load Test 1 Battery', function()  {

});


describe('FILE_2__TEST_1:NB Classifier, Double Classification', function()  {
    before(function()   {

    });
    it('Load theses 2017', function(done) {

        console.log(thesesClassifier.theses2017);

        expect(thesesClassifier.theses2017.length).to.be.equal(427);
        console.log("=============");
        console.log("Main classification, type: " + CLASS_TYPE);
        console.log("=============");
        console.log("Second classifier, type: " + CLASS_TYPE2);
        console.log("=============");
        console.log("Classifier, type: " + CLASSIFICATOR_TYPE);

        for (let j = 0; j < 427; j++)   {
            console.log('================');
            console.log(j);
            console.log('================');
            console.log(thesesClassifier.theses2017[j].id);
            console.log('================');
            console.log(thesesClassifier.theses2017[j].title);
            console.log('================');
            console.log(thesesClassifier.theses2017[j].supervisors);
            console.log('================');
            console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[j], classifier));
            console.log("\n\n\n");
        }
        done();
    });
    it('Test0-1', function(done) {
        console.log(thesesClassifier.theses2017[0]);
        console.log('================');
        console.log(thesesClassifier.theses2017[0].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[0], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[0],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test0-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[0],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test1-1', function(done) {
        console.log(thesesClassifier.theses2017[1]);
        console.log('================');
        console.log(thesesClassifier.theses2017[1].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[1], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[1],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test1-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[1],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test2-1', function(done) {
        console.log(thesesClassifier.theses2017[2]);
        console.log('================');
        console.log(thesesClassifier.theses2017[2].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[2], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[2],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test2-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[2],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test3-1', function(done) {
        console.log(thesesClassifier.theses2017[3]);
        console.log('================');
        console.log(thesesClassifier.theses2017[3].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[3], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[3],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test3-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[3],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test4-1', function(done) {
        console.log(thesesClassifier.theses2017[4]);
        console.log('================');
        console.log(thesesClassifier.theses2017[4].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[4], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[4],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test4-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[4],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test5-1', function(done) {
        console.log(thesesClassifier.theses2017[5]);
        console.log('================');
        console.log(thesesClassifier.theses2017[5].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[5], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[5],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test5-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[5],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test6-1', function(done) {
        console.log(thesesClassifier.theses2017[6]);
        console.log('================');
        console.log(thesesClassifier.theses2017[6].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[6], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[6],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test6-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[6],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test7-1', function(done) {
        console.log(thesesClassifier.theses2017[7]);
        console.log('================');
        console.log(thesesClassifier.theses2017[7].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[7], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[7],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test7-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[7],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test8-1', function(done) {
        console.log(thesesClassifier.theses2017[8]);
        console.log('================');
        console.log(thesesClassifier.theses2017[8].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[8], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[8],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test8-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[8],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test9-1', function(done) {
        console.log(thesesClassifier.theses2017[9]);
        console.log('================');
        console.log(thesesClassifier.theses2017[9].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[9], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[9],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test9-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[9],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test10-1', function(done) {
        console.log(thesesClassifier.theses2017[10]);
        console.log('================');
        console.log(thesesClassifier.theses2017[10].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[10], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[10],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test10-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[10],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test11-1', function(done) {
        console.log(thesesClassifier.theses2017[11]);
        console.log('================');
        console.log(thesesClassifier.theses2017[11].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[11], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[11],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test11-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[11],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test12-1', function(done) {
        console.log(thesesClassifier.theses2017[12]);
        console.log('================');
        console.log(thesesClassifier.theses2017[12].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[12], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[12],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test12-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[12],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test13-1', function(done) {
        console.log(thesesClassifier.theses2017[13]);
        console.log('================');
        console.log(thesesClassifier.theses2017[13].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[13], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[13],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test13-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[13],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test14-1', function(done) {
        console.log(thesesClassifier.theses2017[14]);
        console.log('================');
        console.log(thesesClassifier.theses2017[14].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[14], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[14],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test14-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[14],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test15-1', function(done) {
        console.log(thesesClassifier.theses2017[15]);
        console.log('================');
        console.log(thesesClassifier.theses2017[15].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[15], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[15],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test15-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[15],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test16-1', function(done) {
        console.log(thesesClassifier.theses2017[16]);
        console.log('================');
        console.log(thesesClassifier.theses2017[16].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[16], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[16],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test16-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[16],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test17-1', function(done) {
        console.log(thesesClassifier.theses2017[17]);
        console.log('================');
        console.log(thesesClassifier.theses2017[17].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[17], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[17],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test17-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[17],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test18-1', function(done) {
        console.log(thesesClassifier.theses2017[18]);
        console.log('================');
        console.log(thesesClassifier.theses2017[18].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[18], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[18],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test18-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[18],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test19-1', function(done) {
        console.log(thesesClassifier.theses2017[19]);
        console.log('================');
        console.log(thesesClassifier.theses2017[19].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[19], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[19],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test19-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[19],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test20-1', function(done) {
        console.log(thesesClassifier.theses2017[20]);
        console.log('================');
        console.log(thesesClassifier.theses2017[20].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[20], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[20],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test20-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[20],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test21-1', function(done) {
        console.log(thesesClassifier.theses2017[21]);
        console.log('================');
        console.log(thesesClassifier.theses2017[21].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[21], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[21],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test21-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[21],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test22-1', function(done) {
        console.log(thesesClassifier.theses2017[22]);
        console.log('================');
        console.log(thesesClassifier.theses2017[22].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[22], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[22],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test22-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[22],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test23-1', function(done) {
        console.log(thesesClassifier.theses2017[23]);
        console.log('================');
        console.log(thesesClassifier.theses2017[23].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[23], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[23],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test23-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[23],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test24-1', function(done) {
        console.log(thesesClassifier.theses2017[24]);
        console.log('================');
        console.log(thesesClassifier.theses2017[24].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[24], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[24],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test24-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[24],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test25-1', function(done) {
        console.log(thesesClassifier.theses2017[25]);
        console.log('================');
        console.log(thesesClassifier.theses2017[25].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[25], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[25],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test25-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[25],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test26-1', function(done) {
        console.log(thesesClassifier.theses2017[26]);
        console.log('================');
        console.log(thesesClassifier.theses2017[26].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[26], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[26],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test26-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[26],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test27-1', function(done) {
        console.log(thesesClassifier.theses2017[27]);
        console.log('================');
        console.log(thesesClassifier.theses2017[27].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[27], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[27],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test27-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[27],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test28-1', function(done) {
        console.log(thesesClassifier.theses2017[28]);
        console.log('================');
        console.log(thesesClassifier.theses2017[28].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[28], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[28],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test28-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[28],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test29-1', function(done) {
        console.log(thesesClassifier.theses2017[29]);
        console.log('================');
        console.log(thesesClassifier.theses2017[29].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[29], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[29],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test29-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[29],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test30-1', function(done) {
        console.log(thesesClassifier.theses2017[30]);
        console.log('================');
        console.log(thesesClassifier.theses2017[30].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[30], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[30],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test30-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[30],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test31-1', function(done) {
        console.log(thesesClassifier.theses2017[31]);
        console.log('================');
        console.log(thesesClassifier.theses2017[31].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[31], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[31],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test31-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[31],classifier, CLASS_TYPE2)[1]).to.be.equal('Cyber-Security');
        done();
    });

    it('Test32-1', function(done) {
        console.log(thesesClassifier.theses2017[32]);
        console.log('================');
        console.log(thesesClassifier.theses2017[32].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[32], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[32],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test32-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[32],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test33-1', function(done) {
        console.log(thesesClassifier.theses2017[33]);
        console.log('================');
        console.log(thesesClassifier.theses2017[33].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[33], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[33],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test33-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[33],classifier, CLASS_TYPE2)[1]).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test34-1', function(done) {
        console.log(thesesClassifier.theses2017[34]);
        console.log('================');
        console.log(thesesClassifier.theses2017[34].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[34], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[34],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test34-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[34],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test35-1', function(done) {
        console.log(thesesClassifier.theses2017[35]);
        console.log('================');
        console.log(thesesClassifier.theses2017[35].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[35], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[35],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test35-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[35],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test36-1', function(done) {
        console.log(thesesClassifier.theses2017[36]);
        console.log('================');
        console.log(thesesClassifier.theses2017[36].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[36], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[36],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test36-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[36],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test37-1', function(done) {
        console.log(thesesClassifier.theses2017[37]);
        console.log('================');
        console.log(thesesClassifier.theses2017[37].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[37], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[37],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test37-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[37],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test38-1', function(done) {
        console.log(thesesClassifier.theses2017[38]);
        console.log('================');
        console.log(thesesClassifier.theses2017[38].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[38], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[38],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test38-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[38],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test39-1', function(done) {
        console.log(thesesClassifier.theses2017[39]);
        console.log('================');
        console.log(thesesClassifier.theses2017[39].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[39], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[39],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test39-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[39],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test40-1', function(done) {
        console.log(thesesClassifier.theses2017[40]);
        console.log('================');
        console.log(thesesClassifier.theses2017[40].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[40], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[40],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test40-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[40],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test41-1', function(done) {
        console.log(thesesClassifier.theses2017[41]);
        console.log('================');
        console.log(thesesClassifier.theses2017[41].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[41], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[41],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test41-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[41],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test42-1', function(done) {
        console.log(thesesClassifier.theses2017[42]);
        console.log('================');
        console.log(thesesClassifier.theses2017[42].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[42], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[42],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test42-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[42],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test43-1', function(done) {
        console.log(thesesClassifier.theses2017[43]);
        console.log('================');
        console.log(thesesClassifier.theses2017[43].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[43], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[43],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test43-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[43],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test44-1', function(done) {
        console.log(thesesClassifier.theses2017[44]);
        console.log('================');
        console.log(thesesClassifier.theses2017[44].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[44], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[44],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test44-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[44],classifier, CLASS_TYPE2)[1]).to.be.equal('Cyber-Security');
        done();
    });

    it('Test45-1', function(done) {
        console.log(thesesClassifier.theses2017[45]);
        console.log('================');
        console.log(thesesClassifier.theses2017[45].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[45], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[45],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test45-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[45],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test46-1', function(done) {
        console.log(thesesClassifier.theses2017[46]);
        console.log('================');
        console.log(thesesClassifier.theses2017[46].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[46], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[46],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test46-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[46],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test47-1', function(done) {
        console.log(thesesClassifier.theses2017[47]);
        console.log('================');
        console.log(thesesClassifier.theses2017[47].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[47], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[47],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test47-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[47],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test48-1', function(done) {
        console.log(thesesClassifier.theses2017[48]);
        console.log('================');
        console.log(thesesClassifier.theses2017[48].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[48], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[48],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test48-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[48],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test49-1', function(done) {
        console.log(thesesClassifier.theses2017[49]);
        console.log('================');
        console.log(thesesClassifier.theses2017[49].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[49], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[49],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test49-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[49],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test50-1', function(done) {
        console.log(thesesClassifier.theses2017[50]);
        console.log('================');
        console.log(thesesClassifier.theses2017[50].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[50], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[50],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test50-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[50],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test51-1', function(done) {
        console.log(thesesClassifier.theses2017[51]);
        console.log('================');
        console.log(thesesClassifier.theses2017[51].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[51], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[51],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test51-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[51],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test52-1', function(done) {
        console.log(thesesClassifier.theses2017[52]);
        console.log('================');
        console.log(thesesClassifier.theses2017[52].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[52], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[52],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test52-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[52],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test53-1', function(done) {
        console.log(thesesClassifier.theses2017[53]);
        console.log('================');
        console.log(thesesClassifier.theses2017[53].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[53], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[53],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test53-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[53],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test54-1', function(done) {
        console.log(thesesClassifier.theses2017[54]);
        console.log('================');
        console.log(thesesClassifier.theses2017[54].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[54], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[54],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test54-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[54],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test55-1', function(done) {
        console.log(thesesClassifier.theses2017[55]);
        console.log('================');
        console.log(thesesClassifier.theses2017[55].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[55], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[55],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test55-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[55],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test56-1', function(done) {
        console.log(thesesClassifier.theses2017[56]);
        console.log('================');
        console.log(thesesClassifier.theses2017[56].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[56], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[56],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test56-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[56],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test57-1', function(done) {
        console.log(thesesClassifier.theses2017[57]);
        console.log('================');
        console.log(thesesClassifier.theses2017[57].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[57], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[57],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test57-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[57],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test58-1', function(done) {
        console.log(thesesClassifier.theses2017[58]);
        console.log('================');
        console.log(thesesClassifier.theses2017[58].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[58], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[58],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test58-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[58],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test59-1', function(done) {
        console.log(thesesClassifier.theses2017[59]);
        console.log('================');
        console.log(thesesClassifier.theses2017[59].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[59], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[59],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test59-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[59],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test60-1', function(done) {
        console.log(thesesClassifier.theses2017[60]);
        console.log('================');
        console.log(thesesClassifier.theses2017[60].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[60], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[60],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test60-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[60],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test61-1', function(done) {
        console.log(thesesClassifier.theses2017[61]);
        console.log('================');
        console.log(thesesClassifier.theses2017[61].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[61], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[61],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test61-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[61],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test62-1', function(done) {
        console.log(thesesClassifier.theses2017[62]);
        console.log('================');
        console.log(thesesClassifier.theses2017[62].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[62], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[62],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test62-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[62],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test63-1', function(done) {
        console.log(thesesClassifier.theses2017[63]);
        console.log('================');
        console.log(thesesClassifier.theses2017[63].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[63], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[63],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test63-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[63],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test64-1', function(done) {
        console.log(thesesClassifier.theses2017[64]);
        console.log('================');
        console.log(thesesClassifier.theses2017[64].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[64], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[64],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test64-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[64],classifier, CLASS_TYPE2)[1]).to.be.equal('Games');
        done();
    });

    it('Test65-1', function(done) {
        console.log(thesesClassifier.theses2017[65]);
        console.log('================');
        console.log(thesesClassifier.theses2017[65].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[65], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[65],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test65-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[65],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test66-1', function(done) {
        console.log(thesesClassifier.theses2017[66]);
        console.log('================');
        console.log(thesesClassifier.theses2017[66].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[66], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[66],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test66-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[66],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test67-1', function(done) {
        console.log(thesesClassifier.theses2017[67]);
        console.log('================');
        console.log(thesesClassifier.theses2017[67].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[67], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[67],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test67-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[67],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test68-1', function(done) {
        console.log(thesesClassifier.theses2017[68]);
        console.log('================');
        console.log(thesesClassifier.theses2017[68].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[68], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[68],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test68-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[68],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test69-1', function(done) {
        console.log(thesesClassifier.theses2017[69]);
        console.log('================');
        console.log(thesesClassifier.theses2017[69].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[69], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[69],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test69-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[69],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test70-1', function(done) {
        console.log(thesesClassifier.theses2017[70]);
        console.log('================');
        console.log(thesesClassifier.theses2017[70].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[70], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[70],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test70-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[70],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test71-1', function(done) {
        console.log(thesesClassifier.theses2017[71]);
        console.log('================');
        console.log(thesesClassifier.theses2017[71].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[71], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[71],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test71-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[71],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test72-1', function(done) {
        console.log(thesesClassifier.theses2017[72]);
        console.log('================');
        console.log(thesesClassifier.theses2017[72].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[72], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[72],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test72-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[72],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test73-1', function(done) {
        console.log(thesesClassifier.theses2017[73]);
        console.log('================');
        console.log(thesesClassifier.theses2017[73].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[73], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[73],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test73-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[73],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test74-1', function(done) {
        console.log(thesesClassifier.theses2017[74]);
        console.log('================');
        console.log(thesesClassifier.theses2017[74].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[74], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[74],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test74-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[74],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test75-1', function(done) {
        console.log(thesesClassifier.theses2017[75]);
        console.log('================');
        console.log(thesesClassifier.theses2017[75].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[75], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[75],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test75-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[75],classifier, CLASS_TYPE2)[1]).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test76-1', function(done) {
        console.log(thesesClassifier.theses2017[76]);
        console.log('================');
        console.log(thesesClassifier.theses2017[76].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[76], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[76],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test76-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[76],classifier, CLASS_TYPE2)[1]).to.be.equal('Games');
        done();
    });

    it('Test77-1', function(done) {
        console.log(thesesClassifier.theses2017[77]);
        console.log('================');
        console.log(thesesClassifier.theses2017[77].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[77], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[77],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test77-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[77],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test78-1', function(done) {
        console.log(thesesClassifier.theses2017[78]);
        console.log('================');
        console.log(thesesClassifier.theses2017[78].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[78], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[78],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test78-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[78],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test79-1', function(done) {
        console.log(thesesClassifier.theses2017[79]);
        console.log('================');
        console.log(thesesClassifier.theses2017[79].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[79], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[79],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test79-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[79],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test80-1', function(done) {
        console.log(thesesClassifier.theses2017[80]);
        console.log('================');
        console.log(thesesClassifier.theses2017[80].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[80], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[80],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test80-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[80],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test81-1', function(done) {
        console.log(thesesClassifier.theses2017[81]);
        console.log('================');
        console.log(thesesClassifier.theses2017[81].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[81], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[81],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test81-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[81],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test82-1', function(done) {
        console.log(thesesClassifier.theses2017[82]);
        console.log('================');
        console.log(thesesClassifier.theses2017[82].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[82], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[82],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test82-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[82],classifier, CLASS_TYPE2)[1]).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test83-1', function(done) {
        console.log(thesesClassifier.theses2017[83]);
        console.log('================');
        console.log(thesesClassifier.theses2017[83].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[83], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[83],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test83-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[83],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test84-1', function(done) {
        console.log(thesesClassifier.theses2017[84]);
        console.log('================');
        console.log(thesesClassifier.theses2017[84].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[84], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[84],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test84-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[84],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test85-1', function(done) {
        console.log(thesesClassifier.theses2017[85]);
        console.log('================');
        console.log(thesesClassifier.theses2017[85].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[85], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[85],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test85-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[85],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test86-1', function(done) {
        console.log(thesesClassifier.theses2017[86]);
        console.log('================');
        console.log(thesesClassifier.theses2017[86].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[86], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[86],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test86-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[86],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test87-1', function(done) {
        console.log(thesesClassifier.theses2017[87]);
        console.log('================');
        console.log(thesesClassifier.theses2017[87].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[87], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[87],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test87-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[87],classifier, CLASS_TYPE2)[1]).to.be.equal('Cyber-Security');
        done();
    });

    it('Test88-1', function(done) {
        console.log(thesesClassifier.theses2017[88]);
        console.log('================');
        console.log(thesesClassifier.theses2017[88].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[88], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[88],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test88-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[88],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test89-1', function(done) {
        console.log(thesesClassifier.theses2017[89]);
        console.log('================');
        console.log(thesesClassifier.theses2017[89].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[89], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[89],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test89-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[89],classifier, CLASS_TYPE2)[1]).to.be.equal('Cyber-Security');
        done();
    });

    it('Test90-1', function(done) {
        console.log(thesesClassifier.theses2017[90]);
        console.log('================');
        console.log(thesesClassifier.theses2017[90].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[90], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[90],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test90-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[90],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test91-1', function(done) {
        console.log(thesesClassifier.theses2017[91]);
        console.log('================');
        console.log(thesesClassifier.theses2017[91].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[91], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[91],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test91-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[91],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test92-1', function(done) {
        console.log(thesesClassifier.theses2017[92]);
        console.log('================');
        console.log(thesesClassifier.theses2017[92].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[92], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[92],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test92-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[92],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test93-1', function(done) {
        console.log(thesesClassifier.theses2017[93]);
        console.log('================');
        console.log(thesesClassifier.theses2017[93].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[93], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[93],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test93-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[93],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test94-1', function(done) {
        console.log(thesesClassifier.theses2017[94]);
        console.log('================');
        console.log(thesesClassifier.theses2017[94].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[94], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[94],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test94-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[94],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test95-1', function(done) {
        console.log(thesesClassifier.theses2017[95]);
        console.log('================');
        console.log(thesesClassifier.theses2017[95].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[95], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[95],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test95-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[95],classifier, CLASS_TYPE2)[1]).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test96-1', function(done) {
        console.log(thesesClassifier.theses2017[96]);
        console.log('================');
        console.log(thesesClassifier.theses2017[96].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[96], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[96],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test96-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[96],classifier, CLASS_TYPE2)[1]).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test97-1', function(done) {
        console.log(thesesClassifier.theses2017[97]);
        console.log('================');
        console.log(thesesClassifier.theses2017[97].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[97], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[97],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test97-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[97],classifier, CLASS_TYPE2)[1]).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test98-1', function(done) {
        console.log(thesesClassifier.theses2017[98]);
        console.log('================');
        console.log(thesesClassifier.theses2017[98].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[98], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[98],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test98-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[98],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test99-1', function(done) {
        console.log(thesesClassifier.theses2017[99]);
        console.log('================');
        console.log(thesesClassifier.theses2017[99].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[99], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[99],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test99-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[99],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test100-1', function(done) {
        console.log(thesesClassifier.theses2017[100]);
        console.log('================');
        console.log(thesesClassifier.theses2017[100].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[100], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[100],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test100-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[100],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test101-1', function(done) {
        console.log(thesesClassifier.theses2017[101]);
        console.log('================');
        console.log(thesesClassifier.theses2017[101].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[101], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[101],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test101-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[101],classifier, CLASS_TYPE2)[1]).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test102-1', function(done) {
        console.log(thesesClassifier.theses2017[102]);
        console.log('================');
        console.log(thesesClassifier.theses2017[102].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[102], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[102],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test102-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[102],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test103-1', function(done) {
        console.log(thesesClassifier.theses2017[103]);
        console.log('================');
        console.log(thesesClassifier.theses2017[103].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[103], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[103],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test103-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[103],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test104-1', function(done) {
        console.log(thesesClassifier.theses2017[104]);
        console.log('================');
        console.log(thesesClassifier.theses2017[104].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[104], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[104],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test104-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[104],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test105-1', function(done) {
        console.log(thesesClassifier.theses2017[105]);
        console.log('================');
        console.log(thesesClassifier.theses2017[105].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[105], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[105],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test105-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[105],classifier, CLASS_TYPE2)[1]).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test106-1', function(done) {
        console.log(thesesClassifier.theses2017[106]);
        console.log('================');
        console.log(thesesClassifier.theses2017[106].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[106], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[106],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test106-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[106],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test107-1', function(done) {
        console.log(thesesClassifier.theses2017[107]);
        console.log('================');
        console.log(thesesClassifier.theses2017[107].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[107], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[107],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test107-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[107],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test108-1', function(done) {
        console.log(thesesClassifier.theses2017[108]);
        console.log('================');
        console.log(thesesClassifier.theses2017[108].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[108], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[108],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test108-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[108],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test109-1', function(done) {
        console.log(thesesClassifier.theses2017[109]);
        console.log('================');
        console.log(thesesClassifier.theses2017[109].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[109], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[109],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test109-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[109],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test110-1', function(done) {
        console.log(thesesClassifier.theses2017[110]);
        console.log('================');
        console.log(thesesClassifier.theses2017[110].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[110], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[110],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test110-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[110],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test111-1', function(done) {
        console.log(thesesClassifier.theses2017[111]);
        console.log('================');
        console.log(thesesClassifier.theses2017[111].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[111], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[111],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test111-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[111],classifier, CLASS_TYPE2)[1]).to.be.equal('Cyber-Security');
        done();
    });

    it('Test112-1', function(done) {
        console.log(thesesClassifier.theses2017[112]);
        console.log('================');
        console.log(thesesClassifier.theses2017[112].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[112], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[112],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test112-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[112],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test113-1', function(done) {
        console.log(thesesClassifier.theses2017[113]);
        console.log('================');
        console.log(thesesClassifier.theses2017[113].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[113], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[113],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test113-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[113],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test114-1', function(done) {
        console.log(thesesClassifier.theses2017[114]);
        console.log('================');
        console.log(thesesClassifier.theses2017[114].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[114], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[114],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test114-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[114],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test115-1', function(done) {
        console.log(thesesClassifier.theses2017[115]);
        console.log('================');
        console.log(thesesClassifier.theses2017[115].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[115], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[115],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test115-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[115],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test116-1', function(done) {
        console.log(thesesClassifier.theses2017[116]);
        console.log('================');
        console.log(thesesClassifier.theses2017[116].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[116], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[116],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test116-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[116],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test117-1', function(done) {
        console.log(thesesClassifier.theses2017[117]);
        console.log('================');
        console.log(thesesClassifier.theses2017[117].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[117], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[117],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test117-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[117],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test118-1', function(done) {
        console.log(thesesClassifier.theses2017[118]);
        console.log('================');
        console.log(thesesClassifier.theses2017[118].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[118], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[118],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test118-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[118],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test119-1', function(done) {
        console.log(thesesClassifier.theses2017[119]);
        console.log('================');
        console.log(thesesClassifier.theses2017[119].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[119], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[119],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test119-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[119],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test120-1', function(done) {
        console.log(thesesClassifier.theses2017[120]);
        console.log('================');
        console.log(thesesClassifier.theses2017[120].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[120], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[120],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test120-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[120],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test121-1', function(done) {
        console.log(thesesClassifier.theses2017[121]);
        console.log('================');
        console.log(thesesClassifier.theses2017[121].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[121], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[121],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test121-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[121],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test122-1', function(done) {
        console.log(thesesClassifier.theses2017[122]);
        console.log('================');
        console.log(thesesClassifier.theses2017[122].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[122], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[122],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test122-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[122],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test123-1', function(done) {
        console.log(thesesClassifier.theses2017[123]);
        console.log('================');
        console.log(thesesClassifier.theses2017[123].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[123], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[123],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test123-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[123],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test124-1', function(done) {
        console.log(thesesClassifier.theses2017[124]);
        console.log('================');
        console.log(thesesClassifier.theses2017[124].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[124], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[124],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test124-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[124],classifier, CLASS_TYPE2)[1]).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test125-1', function(done) {
        console.log(thesesClassifier.theses2017[125]);
        console.log('================');
        console.log(thesesClassifier.theses2017[125].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[125], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[125],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test125-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[125],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test126-1', function(done) {
        console.log(thesesClassifier.theses2017[126]);
        console.log('================');
        console.log(thesesClassifier.theses2017[126].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[126], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[126],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test126-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[126],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test127-1', function(done) {
        console.log(thesesClassifier.theses2017[127]);
        console.log('================');
        console.log(thesesClassifier.theses2017[127].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[127], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[127],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test127-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[127],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test128-1', function(done) {
        console.log(thesesClassifier.theses2017[128]);
        console.log('================');
        console.log(thesesClassifier.theses2017[128].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[128], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[128],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test128-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[128],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test129-1', function(done) {
        console.log(thesesClassifier.theses2017[129]);
        console.log('================');
        console.log(thesesClassifier.theses2017[129].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[129], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[129],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test129-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[129],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test130-1', function(done) {
        console.log(thesesClassifier.theses2017[130]);
        console.log('================');
        console.log(thesesClassifier.theses2017[130].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[130], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[130],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test130-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[130],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test131-1', function(done) {
        console.log(thesesClassifier.theses2017[131]);
        console.log('================');
        console.log(thesesClassifier.theses2017[131].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[131], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[131],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test131-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[131],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test132-1', function(done) {
        console.log(thesesClassifier.theses2017[132]);
        console.log('================');
        console.log(thesesClassifier.theses2017[132].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[132], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[132],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test132-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[132],classifier, CLASS_TYPE2)[1]).to.be.equal('Games');
        done();
    });

    it('Test133-1', function(done) {
        console.log(thesesClassifier.theses2017[133]);
        console.log('================');
        console.log(thesesClassifier.theses2017[133].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[133], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[133],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test133-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[133],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test134-1', function(done) {
        console.log(thesesClassifier.theses2017[134]);
        console.log('================');
        console.log(thesesClassifier.theses2017[134].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[134], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[134],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test134-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[134],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test135-1', function(done) {
        console.log(thesesClassifier.theses2017[135]);
        console.log('================');
        console.log(thesesClassifier.theses2017[135].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[135], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[135],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test135-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[135],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test136-1', function(done) {
        console.log(thesesClassifier.theses2017[136]);
        console.log('================');
        console.log(thesesClassifier.theses2017[136].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[136], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[136],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test136-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[136],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test137-1', function(done) {
        console.log(thesesClassifier.theses2017[137]);
        console.log('================');
        console.log(thesesClassifier.theses2017[137].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[137], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[137],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test137-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[137],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test138-1', function(done) {
        console.log(thesesClassifier.theses2017[138]);
        console.log('================');
        console.log(thesesClassifier.theses2017[138].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[138], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[138],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test138-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[138],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test139-1', function(done) {
        console.log(thesesClassifier.theses2017[139]);
        console.log('================');
        console.log(thesesClassifier.theses2017[139].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[139], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[139],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test139-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[139],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test140-1', function(done) {
        console.log(thesesClassifier.theses2017[140]);
        console.log('================');
        console.log(thesesClassifier.theses2017[140].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[140], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[140],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test140-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[140],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test141-1', function(done) {
        console.log(thesesClassifier.theses2017[141]);
        console.log('================');
        console.log(thesesClassifier.theses2017[141].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[141], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[141],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test141-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[141],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test142-1', function(done) {
        console.log(thesesClassifier.theses2017[142]);
        console.log('================');
        console.log(thesesClassifier.theses2017[142].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[142], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[142],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test142-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[142],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test143-1', function(done) {
        console.log(thesesClassifier.theses2017[143]);
        console.log('================');
        console.log(thesesClassifier.theses2017[143].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[143], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[143],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test143-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[143],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test144-1', function(done) {
        console.log(thesesClassifier.theses2017[144]);
        console.log('================');
        console.log(thesesClassifier.theses2017[144].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[144], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[144],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test144-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[144],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test145-1', function(done) {
        console.log(thesesClassifier.theses2017[145]);
        console.log('================');
        console.log(thesesClassifier.theses2017[145].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[145], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[145],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test145-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[145],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test146-1', function(done) {
        console.log(thesesClassifier.theses2017[146]);
        console.log('================');
        console.log(thesesClassifier.theses2017[146].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[146], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[146],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test146-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[146],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test147-1', function(done) {
        console.log(thesesClassifier.theses2017[147]);
        console.log('================');
        console.log(thesesClassifier.theses2017[147].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[147], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[147],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test147-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[147],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test148-1', function(done) {
        console.log(thesesClassifier.theses2017[148]);
        console.log('================');
        console.log(thesesClassifier.theses2017[148].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[148], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[148],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test148-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[148],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test149-1', function(done) {
        console.log(thesesClassifier.theses2017[149]);
        console.log('================');
        console.log(thesesClassifier.theses2017[149].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[149], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[149],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test149-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[149],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test150-1', function(done) {
        console.log(thesesClassifier.theses2017[150]);
        console.log('================');
        console.log(thesesClassifier.theses2017[150].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[150], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[150],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test150-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[150],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test151-1', function(done) {
        console.log(thesesClassifier.theses2017[151]);
        console.log('================');
        console.log(thesesClassifier.theses2017[151].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[151], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[151],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test151-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[151],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test152-1', function(done) {
        console.log(thesesClassifier.theses2017[152]);
        console.log('================');
        console.log(thesesClassifier.theses2017[152].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[152], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[152],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test152-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[152],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test153-1', function(done) {
        console.log(thesesClassifier.theses2017[153]);
        console.log('================');
        console.log(thesesClassifier.theses2017[153].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[153], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[153],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test153-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[153],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test154-1', function(done) {
        console.log(thesesClassifier.theses2017[154]);
        console.log('================');
        console.log(thesesClassifier.theses2017[154].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[154], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[154],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test154-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[154],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test155-1', function(done) {
        console.log(thesesClassifier.theses2017[155]);
        console.log('================');
        console.log(thesesClassifier.theses2017[155].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[155], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[155],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test155-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[155],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test156-1', function(done) {
        console.log(thesesClassifier.theses2017[156]);
        console.log('================');
        console.log(thesesClassifier.theses2017[156].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[156], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[156],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test156-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[156],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test157-1', function(done) {
        console.log(thesesClassifier.theses2017[157]);
        console.log('================');
        console.log(thesesClassifier.theses2017[157].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[157], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[157],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test157-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[157],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test158-1', function(done) {
        console.log(thesesClassifier.theses2017[158]);
        console.log('================');
        console.log(thesesClassifier.theses2017[158].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[158], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[158],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test158-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[158],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test159-1', function(done) {
        console.log(thesesClassifier.theses2017[159]);
        console.log('================');
        console.log(thesesClassifier.theses2017[159].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[159], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[159],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test159-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[159],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test160-1', function(done) {
        console.log(thesesClassifier.theses2017[160]);
        console.log('================');
        console.log(thesesClassifier.theses2017[160].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[160], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[160],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test160-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[160],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test161-1', function(done) {
        console.log(thesesClassifier.theses2017[161]);
        console.log('================');
        console.log(thesesClassifier.theses2017[161].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[161], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[161],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test161-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[161],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test162-1', function(done) {
        console.log(thesesClassifier.theses2017[162]);
        console.log('================');
        console.log(thesesClassifier.theses2017[162].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[162], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[162],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test162-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[162],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test163-1', function(done) {
        console.log(thesesClassifier.theses2017[163]);
        console.log('================');
        console.log(thesesClassifier.theses2017[163].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[163], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[163],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test163-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[163],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test164-1', function(done) {
        console.log(thesesClassifier.theses2017[164]);
        console.log('================');
        console.log(thesesClassifier.theses2017[164].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[164], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[164],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test164-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[164],classifier, CLASS_TYPE2)[1]).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test165-1', function(done) {
        console.log(thesesClassifier.theses2017[165]);
        console.log('================');
        console.log(thesesClassifier.theses2017[165].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[165], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[165],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test165-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[165],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test166-1', function(done) {
        console.log(thesesClassifier.theses2017[166]);
        console.log('================');
        console.log(thesesClassifier.theses2017[166].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[166], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[166],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test166-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[166],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test167-1', function(done) {
        console.log(thesesClassifier.theses2017[167]);
        console.log('================');
        console.log(thesesClassifier.theses2017[167].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[167], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[167],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test167-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[167],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test168-1', function(done) {
        console.log(thesesClassifier.theses2017[168]);
        console.log('================');
        console.log(thesesClassifier.theses2017[168].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[168], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[168],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test168-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[168],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test169-1', function(done) {
        console.log(thesesClassifier.theses2017[169]);
        console.log('================');
        console.log(thesesClassifier.theses2017[169].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[169], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[169],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test169-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[169],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test170-1', function(done) {
        console.log(thesesClassifier.theses2017[170]);
        console.log('================');
        console.log(thesesClassifier.theses2017[170].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[170], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[170],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test170-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[170],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test171-1', function(done) {
        console.log(thesesClassifier.theses2017[171]);
        console.log('================');
        console.log(thesesClassifier.theses2017[171].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[171], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[171],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test171-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[171],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test172-1', function(done) {
        console.log(thesesClassifier.theses2017[172]);
        console.log('================');
        console.log(thesesClassifier.theses2017[172].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[172], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[172],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test172-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[172],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test173-1', function(done) {
        console.log(thesesClassifier.theses2017[173]);
        console.log('================');
        console.log(thesesClassifier.theses2017[173].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[173], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[173],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test173-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[173],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test174-1', function(done) {
        console.log(thesesClassifier.theses2017[174]);
        console.log('================');
        console.log(thesesClassifier.theses2017[174].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[174], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[174],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test174-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[174],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test175-1', function(done) {
        console.log(thesesClassifier.theses2017[175]);
        console.log('================');
        console.log(thesesClassifier.theses2017[175].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[175], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[175],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test175-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[175],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test176-1', function(done) {
        console.log(thesesClassifier.theses2017[176]);
        console.log('================');
        console.log(thesesClassifier.theses2017[176].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[176], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[176],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test176-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[176],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test177-1', function(done) {
        console.log(thesesClassifier.theses2017[177]);
        console.log('================');
        console.log(thesesClassifier.theses2017[177].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[177], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[177],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test177-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[177],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test178-1', function(done) {
        console.log(thesesClassifier.theses2017[178]);
        console.log('================');
        console.log(thesesClassifier.theses2017[178].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[178], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[178],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test178-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[178],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test179-1', function(done) {
        console.log(thesesClassifier.theses2017[179]);
        console.log('================');
        console.log(thesesClassifier.theses2017[179].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[179], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[179],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test179-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[179],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test180-1', function(done) {
        console.log(thesesClassifier.theses2017[180]);
        console.log('================');
        console.log(thesesClassifier.theses2017[180].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[180], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[180],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test180-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[180],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test181-1', function(done) {
        console.log(thesesClassifier.theses2017[181]);
        console.log('================');
        console.log(thesesClassifier.theses2017[181].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[181], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[181],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test181-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[181],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test182-1', function(done) {
        console.log(thesesClassifier.theses2017[182]);
        console.log('================');
        console.log(thesesClassifier.theses2017[182].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[182], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[182],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test182-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[182],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test183-1', function(done) {
        console.log(thesesClassifier.theses2017[183]);
        console.log('================');
        console.log(thesesClassifier.theses2017[183].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[183], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[183],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test183-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[183],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test184-1', function(done) {
        console.log(thesesClassifier.theses2017[184]);
        console.log('================');
        console.log(thesesClassifier.theses2017[184].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[184], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[184],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test184-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[184],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test185-1', function(done) {
        console.log(thesesClassifier.theses2017[185]);
        console.log('================');
        console.log(thesesClassifier.theses2017[185].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[185], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[185],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test185-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[185],classifier, CLASS_TYPE2)[1]).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test186-1', function(done) {
        console.log(thesesClassifier.theses2017[186]);
        console.log('================');
        console.log(thesesClassifier.theses2017[186].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[186], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[186],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test186-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[186],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test187-1', function(done) {
        console.log(thesesClassifier.theses2017[187]);
        console.log('================');
        console.log(thesesClassifier.theses2017[187].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[187], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[187],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test187-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[187],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test188-1', function(done) {
        console.log(thesesClassifier.theses2017[188]);
        console.log('================');
        console.log(thesesClassifier.theses2017[188].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[188], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[188],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test188-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[188],classifier, CLASS_TYPE2)[1]).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test189-1', function(done) {
        console.log(thesesClassifier.theses2017[189]);
        console.log('================');
        console.log(thesesClassifier.theses2017[189].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[189], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[189],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test189-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[189],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test190-1', function(done) {
        console.log(thesesClassifier.theses2017[190]);
        console.log('================');
        console.log(thesesClassifier.theses2017[190].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[190], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[190],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test190-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[190],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test191-1', function(done) {
        console.log(thesesClassifier.theses2017[191]);
        console.log('================');
        console.log(thesesClassifier.theses2017[191].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[191], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[191],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test191-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[191],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test192-1', function(done) {
        console.log(thesesClassifier.theses2017[192]);
        console.log('================');
        console.log(thesesClassifier.theses2017[192].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[192], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[192],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test192-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[192],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test193-1', function(done) {
        console.log(thesesClassifier.theses2017[193]);
        console.log('================');
        console.log(thesesClassifier.theses2017[193].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[193], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[193],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test193-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[193],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test194-1', function(done) {
        console.log(thesesClassifier.theses2017[194]);
        console.log('================');
        console.log(thesesClassifier.theses2017[194].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[194], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[194],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test194-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[194],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test195-1', function(done) {
        console.log(thesesClassifier.theses2017[195]);
        console.log('================');
        console.log(thesesClassifier.theses2017[195].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[195], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[195],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test195-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[195],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test196-1', function(done) {
        console.log(thesesClassifier.theses2017[196]);
        console.log('================');
        console.log(thesesClassifier.theses2017[196].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[196], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[196],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test196-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[196],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test197-1', function(done) {
        console.log(thesesClassifier.theses2017[197]);
        console.log('================');
        console.log(thesesClassifier.theses2017[197].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[197], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[197],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test197-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[197],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test198-1', function(done) {
        console.log(thesesClassifier.theses2017[198]);
        console.log('================');
        console.log(thesesClassifier.theses2017[198].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[198], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[198],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test198-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[198],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test199-1', function(done) {
        console.log(thesesClassifier.theses2017[199]);
        console.log('================');
        console.log(thesesClassifier.theses2017[199].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[199], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[199],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test199-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[199],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test200-1', function(done) {
        console.log(thesesClassifier.theses2017[200]);
        console.log('================');
        console.log(thesesClassifier.theses2017[200].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[200], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[200],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test200-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[200],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test201-1', function(done) {
        console.log(thesesClassifier.theses2017[201]);
        console.log('================');
        console.log(thesesClassifier.theses2017[201].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[201], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[201],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test201-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[201],classifier, CLASS_TYPE2)[1]).to.be.equal('Cyber-Security');
        done();
    });

    it('Test202-1', function(done) {
        console.log(thesesClassifier.theses2017[202]);
        console.log('================');
        console.log(thesesClassifier.theses2017[202].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[202], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[202],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test202-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[202],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test203-1', function(done) {
        console.log(thesesClassifier.theses2017[203]);
        console.log('================');
        console.log(thesesClassifier.theses2017[203].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[203], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[203],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test203-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[203],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test204-1', function(done) {
        console.log(thesesClassifier.theses2017[204]);
        console.log('================');
        console.log(thesesClassifier.theses2017[204].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[204], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[204],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test204-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[204],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test205-1', function(done) {
        console.log(thesesClassifier.theses2017[205]);
        console.log('================');
        console.log(thesesClassifier.theses2017[205].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[205], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[205],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test205-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[205],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test206-1', function(done) {
        console.log(thesesClassifier.theses2017[206]);
        console.log('================');
        console.log(thesesClassifier.theses2017[206].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[206], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[206],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test206-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[206],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test207-1', function(done) {
        console.log(thesesClassifier.theses2017[207]);
        console.log('================');
        console.log(thesesClassifier.theses2017[207].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[207], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[207],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test207-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[207],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test208-1', function(done) {
        console.log(thesesClassifier.theses2017[208]);
        console.log('================');
        console.log(thesesClassifier.theses2017[208].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[208], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[208],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test208-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[208],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test209-1', function(done) {
        console.log(thesesClassifier.theses2017[209]);
        console.log('================');
        console.log(thesesClassifier.theses2017[209].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[209], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[209],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test209-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[209],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test210-1', function(done) {
        console.log(thesesClassifier.theses2017[210]);
        console.log('================');
        console.log(thesesClassifier.theses2017[210].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[210], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[210],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test210-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[210],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test211-1', function(done) {
        console.log(thesesClassifier.theses2017[211]);
        console.log('================');
        console.log(thesesClassifier.theses2017[211].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[211], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[211],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test211-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[211],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test212-1', function(done) {
        console.log(thesesClassifier.theses2017[212]);
        console.log('================');
        console.log(thesesClassifier.theses2017[212].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[212], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[212],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test212-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[212],classifier, CLASS_TYPE2)[1]).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test213-1', function(done) {
        console.log(thesesClassifier.theses2017[213]);
        console.log('================');
        console.log(thesesClassifier.theses2017[213].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[213], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[213],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test213-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[213],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test214-1', function(done) {
        console.log(thesesClassifier.theses2017[214]);
        console.log('================');
        console.log(thesesClassifier.theses2017[214].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[214], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[214],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test214-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[214],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test215-1', function(done) {
        console.log(thesesClassifier.theses2017[215]);
        console.log('================');
        console.log(thesesClassifier.theses2017[215].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[215], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[215],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test215-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[215],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test216-1', function(done) {
        console.log(thesesClassifier.theses2017[216]);
        console.log('================');
        console.log(thesesClassifier.theses2017[216].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[216], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[216],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test216-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[216],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test217-1', function(done) {
        console.log(thesesClassifier.theses2017[217]);
        console.log('================');
        console.log(thesesClassifier.theses2017[217].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[217], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[217],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test217-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[217],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test218-1', function(done) {
        console.log(thesesClassifier.theses2017[218]);
        console.log('================');
        console.log(thesesClassifier.theses2017[218].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[218], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[218],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test218-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[218],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test219-1', function(done) {
        console.log(thesesClassifier.theses2017[219]);
        console.log('================');
        console.log(thesesClassifier.theses2017[219].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[219], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[219],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test219-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[219],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test220-1', function(done) {
        console.log(thesesClassifier.theses2017[220]);
        console.log('================');
        console.log(thesesClassifier.theses2017[220].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[220], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[220],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test220-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[220],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test221-1', function(done) {
        console.log(thesesClassifier.theses2017[221]);
        console.log('================');
        console.log(thesesClassifier.theses2017[221].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[221], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[221],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test221-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[221],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test222-1', function(done) {
        console.log(thesesClassifier.theses2017[222]);
        console.log('================');
        console.log(thesesClassifier.theses2017[222].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[222], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[222],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test222-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[222],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test223-1', function(done) {
        console.log(thesesClassifier.theses2017[223]);
        console.log('================');
        console.log(thesesClassifier.theses2017[223].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[223], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[223],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test223-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[223],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test224-1', function(done) {
        console.log(thesesClassifier.theses2017[224]);
        console.log('================');
        console.log(thesesClassifier.theses2017[224].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[224], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[224],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test224-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[224],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test225-1', function(done) {
        console.log(thesesClassifier.theses2017[225]);
        console.log('================');
        console.log(thesesClassifier.theses2017[225].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[225], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[225],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test225-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[225],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test226-1', function(done) {
        console.log(thesesClassifier.theses2017[226]);
        console.log('================');
        console.log(thesesClassifier.theses2017[226].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[226], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[226],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test226-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[226],classifier, CLASS_TYPE2)[1]).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test227-1', function(done) {
        console.log(thesesClassifier.theses2017[227]);
        console.log('================');
        console.log(thesesClassifier.theses2017[227].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[227], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[227],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test227-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[227],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test228-1', function(done) {
        console.log(thesesClassifier.theses2017[228]);
        console.log('================');
        console.log(thesesClassifier.theses2017[228].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[228], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[228],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test228-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[228],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test229-1', function(done) {
        console.log(thesesClassifier.theses2017[229]);
        console.log('================');
        console.log(thesesClassifier.theses2017[229].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[229], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[229],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test229-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[229],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test230-1', function(done) {
        console.log(thesesClassifier.theses2017[230]);
        console.log('================');
        console.log(thesesClassifier.theses2017[230].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[230], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[230],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test230-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[230],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test231-1', function(done) {
        console.log(thesesClassifier.theses2017[231]);
        console.log('================');
        console.log(thesesClassifier.theses2017[231].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[231], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[231],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test231-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[231],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test232-1', function(done) {
        console.log(thesesClassifier.theses2017[232]);
        console.log('================');
        console.log(thesesClassifier.theses2017[232].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[232], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[232],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test232-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[232],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test233-1', function(done) {
        console.log(thesesClassifier.theses2017[233]);
        console.log('================');
        console.log(thesesClassifier.theses2017[233].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[233], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[233],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test233-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[233],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test234-1', function(done) {
        console.log(thesesClassifier.theses2017[234]);
        console.log('================');
        console.log(thesesClassifier.theses2017[234].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[234], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[234],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test234-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[234],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test235-1', function(done) {
        console.log(thesesClassifier.theses2017[235]);
        console.log('================');
        console.log(thesesClassifier.theses2017[235].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[235], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[235],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test235-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[235],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test236-1', function(done) {
        console.log(thesesClassifier.theses2017[236]);
        console.log('================');
        console.log(thesesClassifier.theses2017[236].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[236], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[236],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test236-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[236],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test237-1', function(done) {
        console.log(thesesClassifier.theses2017[237]);
        console.log('================');
        console.log(thesesClassifier.theses2017[237].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[237], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[237],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test237-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[237],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test238-1', function(done) {
        console.log(thesesClassifier.theses2017[238]);
        console.log('================');
        console.log(thesesClassifier.theses2017[238].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[238], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[238],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test238-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[238],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test239-1', function(done) {
        console.log(thesesClassifier.theses2017[239]);
        console.log('================');
        console.log(thesesClassifier.theses2017[239].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[239], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[239],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test239-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[239],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test240-1', function(done) {
        console.log(thesesClassifier.theses2017[240]);
        console.log('================');
        console.log(thesesClassifier.theses2017[240].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[240], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[240],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test240-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[240],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test241-1', function(done) {
        console.log(thesesClassifier.theses2017[241]);
        console.log('================');
        console.log(thesesClassifier.theses2017[241].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[241], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[241],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test241-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[241],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test242-1', function(done) {
        console.log(thesesClassifier.theses2017[242]);
        console.log('================');
        console.log(thesesClassifier.theses2017[242].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[242], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[242],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test242-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[242],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test243-1', function(done) {
        console.log(thesesClassifier.theses2017[243]);
        console.log('================');
        console.log(thesesClassifier.theses2017[243].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[243], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[243],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test243-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[243],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test244-1', function(done) {
        console.log(thesesClassifier.theses2017[244]);
        console.log('================');
        console.log(thesesClassifier.theses2017[244].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[244], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[244],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test244-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[244],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test245-1', function(done) {
        console.log(thesesClassifier.theses2017[245]);
        console.log('================');
        console.log(thesesClassifier.theses2017[245].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[245], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[245],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test245-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[245],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test246-1', function(done) {
        console.log(thesesClassifier.theses2017[246]);
        console.log('================');
        console.log(thesesClassifier.theses2017[246].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[246], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[246],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test246-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[246],classifier, CLASS_TYPE2)[1]).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test247-1', function(done) {
        console.log(thesesClassifier.theses2017[247]);
        console.log('================');
        console.log(thesesClassifier.theses2017[247].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[247], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[247],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test247-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[247],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test248-1', function(done) {
        console.log(thesesClassifier.theses2017[248]);
        console.log('================');
        console.log(thesesClassifier.theses2017[248].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[248], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[248],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test248-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[248],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test249-1', function(done) {
        console.log(thesesClassifier.theses2017[249]);
        console.log('================');
        console.log(thesesClassifier.theses2017[249].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[249], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[249],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test249-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[249],classifier, CLASS_TYPE2)[1]).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test250-1', function(done) {
        console.log(thesesClassifier.theses2017[250]);
        console.log('================');
        console.log(thesesClassifier.theses2017[250].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[250], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[250],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test250-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[250],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test251-1', function(done) {
        console.log(thesesClassifier.theses2017[251]);
        console.log('================');
        console.log(thesesClassifier.theses2017[251].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[251], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[251],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test251-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[251],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test252-1', function(done) {
        console.log(thesesClassifier.theses2017[252]);
        console.log('================');
        console.log(thesesClassifier.theses2017[252].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[252], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[252],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test252-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[252],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test253-1', function(done) {
        console.log(thesesClassifier.theses2017[253]);
        console.log('================');
        console.log(thesesClassifier.theses2017[253].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[253], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[253],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test253-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[253],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test254-1', function(done) {
        console.log(thesesClassifier.theses2017[254]);
        console.log('================');
        console.log(thesesClassifier.theses2017[254].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[254], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[254],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test254-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[254],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test255-1', function(done) {
        console.log(thesesClassifier.theses2017[255]);
        console.log('================');
        console.log(thesesClassifier.theses2017[255].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[255], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[255],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test255-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[255],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test256-1', function(done) {
        console.log(thesesClassifier.theses2017[256]);
        console.log('================');
        console.log(thesesClassifier.theses2017[256].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[256], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[256],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test256-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[256],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test257-1', function(done) {
        console.log(thesesClassifier.theses2017[257]);
        console.log('================');
        console.log(thesesClassifier.theses2017[257].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[257], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[257],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test257-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[257],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test258-1', function(done) {
        console.log(thesesClassifier.theses2017[258]);
        console.log('================');
        console.log(thesesClassifier.theses2017[258].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[258], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[258],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test258-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[258],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test259-1', function(done) {
        console.log(thesesClassifier.theses2017[259]);
        console.log('================');
        console.log(thesesClassifier.theses2017[259].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[259], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[259],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test259-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[259],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test260-1', function(done) {
        console.log(thesesClassifier.theses2017[260]);
        console.log('================');
        console.log(thesesClassifier.theses2017[260].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[260], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[260],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test260-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[260],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test261-1', function(done) {
        console.log(thesesClassifier.theses2017[261]);
        console.log('================');
        console.log(thesesClassifier.theses2017[261].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[261], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[261],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test261-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[261],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test262-1', function(done) {
        console.log(thesesClassifier.theses2017[262]);
        console.log('================');
        console.log(thesesClassifier.theses2017[262].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[262], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[262],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test262-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[262],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test263-1', function(done) {
        console.log(thesesClassifier.theses2017[263]);
        console.log('================');
        console.log(thesesClassifier.theses2017[263].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[263], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[263],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test263-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[263],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test264-1', function(done) {
        console.log(thesesClassifier.theses2017[264]);
        console.log('================');
        console.log(thesesClassifier.theses2017[264].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[264], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[264],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test264-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[264],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test265-1', function(done) {
        console.log(thesesClassifier.theses2017[265]);
        console.log('================');
        console.log(thesesClassifier.theses2017[265].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[265], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[265],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test265-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[265],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test266-1', function(done) {
        console.log(thesesClassifier.theses2017[266]);
        console.log('================');
        console.log(thesesClassifier.theses2017[266].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[266], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[266],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test266-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[266],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test267-1', function(done) {
        console.log(thesesClassifier.theses2017[267]);
        console.log('================');
        console.log(thesesClassifier.theses2017[267].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[267], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[267],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test267-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[267],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test268-1', function(done) {
        console.log(thesesClassifier.theses2017[268]);
        console.log('================');
        console.log(thesesClassifier.theses2017[268].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[268], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[268],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test268-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[268],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test269-1', function(done) {
        console.log(thesesClassifier.theses2017[269]);
        console.log('================');
        console.log(thesesClassifier.theses2017[269].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[269], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[269],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test269-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[269],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test270-1', function(done) {
        console.log(thesesClassifier.theses2017[270]);
        console.log('================');
        console.log(thesesClassifier.theses2017[270].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[270], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[270],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test270-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[270],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test271-1', function(done) {
        console.log(thesesClassifier.theses2017[271]);
        console.log('================');
        console.log(thesesClassifier.theses2017[271].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[271], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[271],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test271-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[271],classifier, CLASS_TYPE2)[1]).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test272-1', function(done) {
        console.log(thesesClassifier.theses2017[272]);
        console.log('================');
        console.log(thesesClassifier.theses2017[272].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[272], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[272],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test272-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[272],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test273-1', function(done) {
        console.log(thesesClassifier.theses2017[273]);
        console.log('================');
        console.log(thesesClassifier.theses2017[273].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[273], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[273],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test273-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[273],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test274-1', function(done) {
        console.log(thesesClassifier.theses2017[274]);
        console.log('================');
        console.log(thesesClassifier.theses2017[274].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[274], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[274],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test274-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[274],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test275-1', function(done) {
        console.log(thesesClassifier.theses2017[275]);
        console.log('================');
        console.log(thesesClassifier.theses2017[275].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[275], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[275],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test275-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[275],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test276-1', function(done) {
        console.log(thesesClassifier.theses2017[276]);
        console.log('================');
        console.log(thesesClassifier.theses2017[276].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[276], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[276],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test276-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[276],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test277-1', function(done) {
        console.log(thesesClassifier.theses2017[277]);
        console.log('================');
        console.log(thesesClassifier.theses2017[277].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[277], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[277],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test277-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[277],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test278-1', function(done) {
        console.log(thesesClassifier.theses2017[278]);
        console.log('================');
        console.log(thesesClassifier.theses2017[278].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[278], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[278],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test278-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[278],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test279-1', function(done) {
        console.log(thesesClassifier.theses2017[279]);
        console.log('================');
        console.log(thesesClassifier.theses2017[279].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[279], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[279],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test279-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[279],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test280-1', function(done) {
        console.log(thesesClassifier.theses2017[280]);
        console.log('================');
        console.log(thesesClassifier.theses2017[280].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[280], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[280],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test280-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[280],classifier, CLASS_TYPE2)[1]).to.be.equal('Games');
        done();
    });

    it('Test281-1', function(done) {
        console.log(thesesClassifier.theses2017[281]);
        console.log('================');
        console.log(thesesClassifier.theses2017[281].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[281], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[281],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test281-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[281],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test282-1', function(done) {
        console.log(thesesClassifier.theses2017[282]);
        console.log('================');
        console.log(thesesClassifier.theses2017[282].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[282], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[282],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test282-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[282],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test283-1', function(done) {
        console.log(thesesClassifier.theses2017[283]);
        console.log('================');
        console.log(thesesClassifier.theses2017[283].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[283], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[283],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test283-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[283],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test284-1', function(done) {
        console.log(thesesClassifier.theses2017[284]);
        console.log('================');
        console.log(thesesClassifier.theses2017[284].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[284], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[284],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test284-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[284],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test285-1', function(done) {
        console.log(thesesClassifier.theses2017[285]);
        console.log('================');
        console.log(thesesClassifier.theses2017[285].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[285], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[285],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test285-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[285],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test286-1', function(done) {
        console.log(thesesClassifier.theses2017[286]);
        console.log('================');
        console.log(thesesClassifier.theses2017[286].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[286], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[286],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test286-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[286],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test287-1', function(done) {
        console.log(thesesClassifier.theses2017[287]);
        console.log('================');
        console.log(thesesClassifier.theses2017[287].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[287], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[287],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test287-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[287],classifier, CLASS_TYPE2)[1]).to.be.equal('Cyber-Security');
        done();
    });

    it('Test288-1', function(done) {
        console.log(thesesClassifier.theses2017[288]);
        console.log('================');
        console.log(thesesClassifier.theses2017[288].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[288], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[288],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test288-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[288],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test289-1', function(done) {
        console.log(thesesClassifier.theses2017[289]);
        console.log('================');
        console.log(thesesClassifier.theses2017[289].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[289], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[289],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test289-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[289],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test290-1', function(done) {
        console.log(thesesClassifier.theses2017[290]);
        console.log('================');
        console.log(thesesClassifier.theses2017[290].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[290], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[290],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test290-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[290],classifier, CLASS_TYPE2)[1]).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test291-1', function(done) {
        console.log(thesesClassifier.theses2017[291]);
        console.log('================');
        console.log(thesesClassifier.theses2017[291].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[291], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[291],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test291-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[291],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test292-1', function(done) {
        console.log(thesesClassifier.theses2017[292]);
        console.log('================');
        console.log(thesesClassifier.theses2017[292].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[292], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[292],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test292-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[292],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test293-1', function(done) {
        console.log(thesesClassifier.theses2017[293]);
        console.log('================');
        console.log(thesesClassifier.theses2017[293].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[293], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[293],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test293-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[293],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test294-1', function(done) {
        console.log(thesesClassifier.theses2017[294]);
        console.log('================');
        console.log(thesesClassifier.theses2017[294].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[294], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[294],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test294-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[294],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test295-1', function(done) {
        console.log(thesesClassifier.theses2017[295]);
        console.log('================');
        console.log(thesesClassifier.theses2017[295].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[295], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[295],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test295-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[295],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test296-1', function(done) {
        console.log(thesesClassifier.theses2017[296]);
        console.log('================');
        console.log(thesesClassifier.theses2017[296].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[296], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[296],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test296-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[296],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test297-1', function(done) {
        console.log(thesesClassifier.theses2017[297]);
        console.log('================');
        console.log(thesesClassifier.theses2017[297].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[297], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[297],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test297-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[297],classifier, CLASS_TYPE2)[1]).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test298-1', function(done) {
        console.log(thesesClassifier.theses2017[298]);
        console.log('================');
        console.log(thesesClassifier.theses2017[298].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[298], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[298],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test298-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[298],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test299-1', function(done) {
        console.log(thesesClassifier.theses2017[299]);
        console.log('================');
        console.log(thesesClassifier.theses2017[299].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[299], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[299],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test299-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[299],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test300-1', function(done) {
        console.log(thesesClassifier.theses2017[300]);
        console.log('================');
        console.log(thesesClassifier.theses2017[300].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[300], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[300],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test300-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[300],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test301-1', function(done) {
        console.log(thesesClassifier.theses2017[301]);
        console.log('================');
        console.log(thesesClassifier.theses2017[301].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[301], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[301],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test301-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[301],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test302-1', function(done) {
        console.log(thesesClassifier.theses2017[302]);
        console.log('================');
        console.log(thesesClassifier.theses2017[302].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[302], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[302],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test302-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[302],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test303-1', function(done) {
        console.log(thesesClassifier.theses2017[303]);
        console.log('================');
        console.log(thesesClassifier.theses2017[303].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[303], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[303],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test303-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[303],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test304-1', function(done) {
        console.log(thesesClassifier.theses2017[304]);
        console.log('================');
        console.log(thesesClassifier.theses2017[304].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[304], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[304],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test304-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[304],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test305-1', function(done) {
        console.log(thesesClassifier.theses2017[305]);
        console.log('================');
        console.log(thesesClassifier.theses2017[305].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[305], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[305],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test305-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[305],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test306-1', function(done) {
        console.log(thesesClassifier.theses2017[306]);
        console.log('================');
        console.log(thesesClassifier.theses2017[306].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[306], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[306],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test306-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[306],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test307-1', function(done) {
        console.log(thesesClassifier.theses2017[307]);
        console.log('================');
        console.log(thesesClassifier.theses2017[307].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[307], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[307],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test307-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[307],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test308-1', function(done) {
        console.log(thesesClassifier.theses2017[308]);
        console.log('================');
        console.log(thesesClassifier.theses2017[308].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[308], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[308],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test308-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[308],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test309-1', function(done) {
        console.log(thesesClassifier.theses2017[309]);
        console.log('================');
        console.log(thesesClassifier.theses2017[309].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[309], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[309],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test309-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[309],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test310-1', function(done) {
        console.log(thesesClassifier.theses2017[310]);
        console.log('================');
        console.log(thesesClassifier.theses2017[310].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[310], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[310],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test310-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[310],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test311-1', function(done) {
        console.log(thesesClassifier.theses2017[311]);
        console.log('================');
        console.log(thesesClassifier.theses2017[311].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[311], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[311],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test311-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[311],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test312-1', function(done) {
        console.log(thesesClassifier.theses2017[312]);
        console.log('================');
        console.log(thesesClassifier.theses2017[312].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[312], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[312],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test312-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[312],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test313-1', function(done) {
        console.log(thesesClassifier.theses2017[313]);
        console.log('================');
        console.log(thesesClassifier.theses2017[313].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[313], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[313],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test313-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[313],classifier, CLASS_TYPE2)[1]).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test314-1', function(done) {
        console.log(thesesClassifier.theses2017[314]);
        console.log('================');
        console.log(thesesClassifier.theses2017[314].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[314], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[314],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test314-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[314],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test315-1', function(done) {
        console.log(thesesClassifier.theses2017[315]);
        console.log('================');
        console.log(thesesClassifier.theses2017[315].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[315], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[315],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test315-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[315],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test316-1', function(done) {
        console.log(thesesClassifier.theses2017[316]);
        console.log('================');
        console.log(thesesClassifier.theses2017[316].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[316], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[316],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test316-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[316],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test317-1', function(done) {
        console.log(thesesClassifier.theses2017[317]);
        console.log('================');
        console.log(thesesClassifier.theses2017[317].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[317], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[317],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test317-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[317],classifier, CLASS_TYPE2)[1]).to.be.equal('Games');
        done();
    });

    it('Test318-1', function(done) {
        console.log(thesesClassifier.theses2017[318]);
        console.log('================');
        console.log(thesesClassifier.theses2017[318].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[318], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[318],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test318-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[318],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test319-1', function(done) {
        console.log(thesesClassifier.theses2017[319]);
        console.log('================');
        console.log(thesesClassifier.theses2017[319].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[319], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[319],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test319-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[319],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test320-1', function(done) {
        console.log(thesesClassifier.theses2017[320]);
        console.log('================');
        console.log(thesesClassifier.theses2017[320].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[320], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[320],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test320-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[320],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test321-1', function(done) {
        console.log(thesesClassifier.theses2017[321]);
        console.log('================');
        console.log(thesesClassifier.theses2017[321].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[321], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[321],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test321-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[321],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test322-1', function(done) {
        console.log(thesesClassifier.theses2017[322]);
        console.log('================');
        console.log(thesesClassifier.theses2017[322].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[322], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[322],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test322-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[322],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test323-1', function(done) {
        console.log(thesesClassifier.theses2017[323]);
        console.log('================');
        console.log(thesesClassifier.theses2017[323].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[323], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[323],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test323-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[323],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test324-1', function(done) {
        console.log(thesesClassifier.theses2017[324]);
        console.log('================');
        console.log(thesesClassifier.theses2017[324].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[324], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[324],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test324-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[324],classifier, CLASS_TYPE2)[1]).to.be.equal('Cyber-Security');
        done();
    });

    it('Test325-1', function(done) {
        console.log(thesesClassifier.theses2017[325]);
        console.log('================');
        console.log(thesesClassifier.theses2017[325].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[325], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[325],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test325-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[325],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test326-1', function(done) {
        console.log(thesesClassifier.theses2017[326]);
        console.log('================');
        console.log(thesesClassifier.theses2017[326].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[326], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[326],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test326-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[326],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test327-1', function(done) {
        console.log(thesesClassifier.theses2017[327]);
        console.log('================');
        console.log(thesesClassifier.theses2017[327].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[327], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[327],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test327-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[327],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test328-1', function(done) {
        console.log(thesesClassifier.theses2017[328]);
        console.log('================');
        console.log(thesesClassifier.theses2017[328].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[328], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[328],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test328-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[328],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test329-1', function(done) {
        console.log(thesesClassifier.theses2017[329]);
        console.log('================');
        console.log(thesesClassifier.theses2017[329].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[329], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[329],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test329-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[329],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test330-1', function(done) {
        console.log(thesesClassifier.theses2017[330]);
        console.log('================');
        console.log(thesesClassifier.theses2017[330].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[330], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[330],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test330-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[330],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test331-1', function(done) {
        console.log(thesesClassifier.theses2017[331]);
        console.log('================');
        console.log(thesesClassifier.theses2017[331].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[331], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[331],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test331-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[331],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test332-1', function(done) {
        console.log(thesesClassifier.theses2017[332]);
        console.log('================');
        console.log(thesesClassifier.theses2017[332].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[332], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[332],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test332-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[332],classifier, CLASS_TYPE2)[1]).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test333-1', function(done) {
        console.log(thesesClassifier.theses2017[333]);
        console.log('================');
        console.log(thesesClassifier.theses2017[333].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[333], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[333],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test333-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[333],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test334-1', function(done) {
        console.log(thesesClassifier.theses2017[334]);
        console.log('================');
        console.log(thesesClassifier.theses2017[334].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[334], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[334],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test334-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[334],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test335-1', function(done) {
        console.log(thesesClassifier.theses2017[335]);
        console.log('================');
        console.log(thesesClassifier.theses2017[335].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[335], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[335],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test335-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[335],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test336-1', function(done) {
        console.log(thesesClassifier.theses2017[336]);
        console.log('================');
        console.log(thesesClassifier.theses2017[336].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[336], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[336],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test336-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[336],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test337-1', function(done) {
        console.log(thesesClassifier.theses2017[337]);
        console.log('================');
        console.log(thesesClassifier.theses2017[337].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[337], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[337],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test337-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[337],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test338-1', function(done) {
        console.log(thesesClassifier.theses2017[338]);
        console.log('================');
        console.log(thesesClassifier.theses2017[338].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[338], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[338],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test338-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[338],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test339-1', function(done) {
        console.log(thesesClassifier.theses2017[339]);
        console.log('================');
        console.log(thesesClassifier.theses2017[339].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[339], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[339],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test339-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[339],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test340-1', function(done) {
        console.log(thesesClassifier.theses2017[340]);
        console.log('================');
        console.log(thesesClassifier.theses2017[340].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[340], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[340],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test340-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[340],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test341-1', function(done) {
        console.log(thesesClassifier.theses2017[341]);
        console.log('================');
        console.log(thesesClassifier.theses2017[341].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[341], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[341],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test341-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[341],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test342-1', function(done) {
        console.log(thesesClassifier.theses2017[342]);
        console.log('================');
        console.log(thesesClassifier.theses2017[342].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[342], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[342],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test342-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[342],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test343-1', function(done) {
        console.log(thesesClassifier.theses2017[343]);
        console.log('================');
        console.log(thesesClassifier.theses2017[343].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[343], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[343],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test343-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[343],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test344-1', function(done) {
        console.log(thesesClassifier.theses2017[344]);
        console.log('================');
        console.log(thesesClassifier.theses2017[344].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[344], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[344],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test344-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[344],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test345-1', function(done) {
        console.log(thesesClassifier.theses2017[345]);
        console.log('================');
        console.log(thesesClassifier.theses2017[345].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[345], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[345],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test345-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[345],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test346-1', function(done) {
        console.log(thesesClassifier.theses2017[346]);
        console.log('================');
        console.log(thesesClassifier.theses2017[346].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[346], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[346],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test346-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[346],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test347-1', function(done) {
        console.log(thesesClassifier.theses2017[347]);
        console.log('================');
        console.log(thesesClassifier.theses2017[347].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[347], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[347],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test347-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[347],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test348-1', function(done) {
        console.log(thesesClassifier.theses2017[348]);
        console.log('================');
        console.log(thesesClassifier.theses2017[348].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[348], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[348],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test348-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[348],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test349-1', function(done) {
        console.log(thesesClassifier.theses2017[349]);
        console.log('================');
        console.log(thesesClassifier.theses2017[349].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[349], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[349],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test349-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[349],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test350-1', function(done) {
        console.log(thesesClassifier.theses2017[350]);
        console.log('================');
        console.log(thesesClassifier.theses2017[350].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[350], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[350],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test350-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[350],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test351-1', function(done) {
        console.log(thesesClassifier.theses2017[351]);
        console.log('================');
        console.log(thesesClassifier.theses2017[351].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[351], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[351],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test351-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[351],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test352-1', function(done) {
        console.log(thesesClassifier.theses2017[352]);
        console.log('================');
        console.log(thesesClassifier.theses2017[352].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[352], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[352],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test352-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[352],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test353-1', function(done) {
        console.log(thesesClassifier.theses2017[353]);
        console.log('================');
        console.log(thesesClassifier.theses2017[353].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[353], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[353],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test353-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[353],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test354-1', function(done) {
        console.log(thesesClassifier.theses2017[354]);
        console.log('================');
        console.log(thesesClassifier.theses2017[354].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[354], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[354],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test354-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[354],classifier, CLASS_TYPE2)[1]).to.be.equal('Games');
        done();
    });

    it('Test355-1', function(done) {
        console.log(thesesClassifier.theses2017[355]);
        console.log('================');
        console.log(thesesClassifier.theses2017[355].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[355], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[355],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test355-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[355],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test356-1', function(done) {
        console.log(thesesClassifier.theses2017[356]);
        console.log('================');
        console.log(thesesClassifier.theses2017[356].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[356], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[356],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test356-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[356],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test357-1', function(done) {
        console.log(thesesClassifier.theses2017[357]);
        console.log('================');
        console.log(thesesClassifier.theses2017[357].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[357], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[357],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test357-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[357],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test358-1', function(done) {
        console.log(thesesClassifier.theses2017[358]);
        console.log('================');
        console.log(thesesClassifier.theses2017[358].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[358], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[358],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test358-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[358],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test359-1', function(done) {
        console.log(thesesClassifier.theses2017[359]);
        console.log('================');
        console.log(thesesClassifier.theses2017[359].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[359], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[359],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test359-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[359],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test360-1', function(done) {
        console.log(thesesClassifier.theses2017[360]);
        console.log('================');
        console.log(thesesClassifier.theses2017[360].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[360], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[360],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test360-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[360],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test361-1', function(done) {
        console.log(thesesClassifier.theses2017[361]);
        console.log('================');
        console.log(thesesClassifier.theses2017[361].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[361], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[361],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test361-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[361],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test362-1', function(done) {
        console.log(thesesClassifier.theses2017[362]);
        console.log('================');
        console.log(thesesClassifier.theses2017[362].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[362], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[362],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test362-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[362],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test363-1', function(done) {
        console.log(thesesClassifier.theses2017[363]);
        console.log('================');
        console.log(thesesClassifier.theses2017[363].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[363], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[363],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test363-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[363],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test364-1', function(done) {
        console.log(thesesClassifier.theses2017[364]);
        console.log('================');
        console.log(thesesClassifier.theses2017[364].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[364], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[364],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test364-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[364],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test365-1', function(done) {
        console.log(thesesClassifier.theses2017[365]);
        console.log('================');
        console.log(thesesClassifier.theses2017[365].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[365], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[365],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test365-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[365],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test366-1', function(done) {
        console.log(thesesClassifier.theses2017[366]);
        console.log('================');
        console.log(thesesClassifier.theses2017[366].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[366], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[366],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test366-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[366],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test367-1', function(done) {
        console.log(thesesClassifier.theses2017[367]);
        console.log('================');
        console.log(thesesClassifier.theses2017[367].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[367], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[367],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test367-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[367],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test368-1', function(done) {
        console.log(thesesClassifier.theses2017[368]);
        console.log('================');
        console.log(thesesClassifier.theses2017[368].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[368], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[368],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test368-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[368],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test369-1', function(done) {
        console.log(thesesClassifier.theses2017[369]);
        console.log('================');
        console.log(thesesClassifier.theses2017[369].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[369], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[369],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test369-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[369],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test370-1', function(done) {
        console.log(thesesClassifier.theses2017[370]);
        console.log('================');
        console.log(thesesClassifier.theses2017[370].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[370], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[370],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test370-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[370],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test371-1', function(done) {
        console.log(thesesClassifier.theses2017[371]);
        console.log('================');
        console.log(thesesClassifier.theses2017[371].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[371], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[371],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test371-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[371],classifier, CLASS_TYPE2)[1]).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test372-1', function(done) {
        console.log(thesesClassifier.theses2017[372]);
        console.log('================');
        console.log(thesesClassifier.theses2017[372].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[372], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[372],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test372-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[372],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test373-1', function(done) {
        console.log(thesesClassifier.theses2017[373]);
        console.log('================');
        console.log(thesesClassifier.theses2017[373].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[373], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[373],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test373-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[373],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test374-1', function(done) {
        console.log(thesesClassifier.theses2017[374]);
        console.log('================');
        console.log(thesesClassifier.theses2017[374].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[374], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[374],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test374-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[374],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test375-1', function(done) {
        console.log(thesesClassifier.theses2017[375]);
        console.log('================');
        console.log(thesesClassifier.theses2017[375].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[375], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[375],classifier, CLASS_TYPE)).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test375-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[375],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test376-1', function(done) {
        console.log(thesesClassifier.theses2017[376]);
        console.log('================');
        console.log(thesesClassifier.theses2017[376].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[376], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[376],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test376-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[376],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test377-1', function(done) {
        console.log(thesesClassifier.theses2017[377]);
        console.log('================');
        console.log(thesesClassifier.theses2017[377].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[377], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[377],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test377-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[377],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test378-1', function(done) {
        console.log(thesesClassifier.theses2017[378]);
        console.log('================');
        console.log(thesesClassifier.theses2017[378].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[378], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[378],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test378-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[378],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test379-1', function(done) {
        console.log(thesesClassifier.theses2017[379]);
        console.log('================');
        console.log(thesesClassifier.theses2017[379].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[379], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[379],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test379-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[379],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test380-1', function(done) {
        console.log(thesesClassifier.theses2017[380]);
        console.log('================');
        console.log(thesesClassifier.theses2017[380].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[380], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[380],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test380-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[380],classifier, CLASS_TYPE2)[1]).to.be.equal('Cyber-Security');
        done();
    });

    it('Test381-1', function(done) {
        console.log(thesesClassifier.theses2017[381]);
        console.log('================');
        console.log(thesesClassifier.theses2017[381].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[381], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[381],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test381-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[381],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test382-1', function(done) {
        console.log(thesesClassifier.theses2017[382]);
        console.log('================');
        console.log(thesesClassifier.theses2017[382].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[382], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[382],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test382-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[382],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test383-1', function(done) {
        console.log(thesesClassifier.theses2017[383]);
        console.log('================');
        console.log(thesesClassifier.theses2017[383].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[383], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[383],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test383-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[383],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test384-1', function(done) {
        console.log(thesesClassifier.theses2017[384]);
        console.log('================');
        console.log(thesesClassifier.theses2017[384].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[384], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[384],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test384-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[384],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test385-1', function(done) {
        console.log(thesesClassifier.theses2017[385]);
        console.log('================');
        console.log(thesesClassifier.theses2017[385].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[385], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[385],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test385-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[385],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test386-1', function(done) {
        console.log(thesesClassifier.theses2017[386]);
        console.log('================');
        console.log(thesesClassifier.theses2017[386].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[386], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[386],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test386-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[386],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test387-1', function(done) {
        console.log(thesesClassifier.theses2017[387]);
        console.log('================');
        console.log(thesesClassifier.theses2017[387].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[387], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[387],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test387-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[387],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test388-1', function(done) {
        console.log(thesesClassifier.theses2017[388]);
        console.log('================');
        console.log(thesesClassifier.theses2017[388].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[388], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[388],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test388-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[388],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test389-1', function(done) {
        console.log(thesesClassifier.theses2017[389]);
        console.log('================');
        console.log(thesesClassifier.theses2017[389].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[389], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[389],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test389-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[389],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test390-1', function(done) {
        console.log(thesesClassifier.theses2017[390]);
        console.log('================');
        console.log(thesesClassifier.theses2017[390].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[390], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[390],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test390-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[390],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test391-1', function(done) {
        console.log(thesesClassifier.theses2017[391]);
        console.log('================');
        console.log(thesesClassifier.theses2017[391].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[391], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[391],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test391-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[391],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test392-1', function(done) {
        console.log(thesesClassifier.theses2017[392]);
        console.log('================');
        console.log(thesesClassifier.theses2017[392].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[392], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[392],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test392-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[392],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test393-1', function(done) {
        console.log(thesesClassifier.theses2017[393]);
        console.log('================');
        console.log(thesesClassifier.theses2017[393].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[393], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[393],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test393-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[393],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test394-1', function(done) {
        console.log(thesesClassifier.theses2017[394]);
        console.log('================');
        console.log(thesesClassifier.theses2017[394].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[394], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[394],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test394-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[394],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test395-1', function(done) {
        console.log(thesesClassifier.theses2017[395]);
        console.log('================');
        console.log(thesesClassifier.theses2017[395].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[395], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[395],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test395-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[395],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test396-1', function(done) {
        console.log(thesesClassifier.theses2017[396]);
        console.log('================');
        console.log(thesesClassifier.theses2017[396].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[396], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[396],classifier, CLASS_TYPE)).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test396-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[396],classifier, CLASS_TYPE2)[1]).to.be.equal('Games');
        done();
    });

    it('Test397-1', function(done) {
        console.log(thesesClassifier.theses2017[397]);
        console.log('================');
        console.log(thesesClassifier.theses2017[397].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[397], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[397],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test397-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[397],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test398-1', function(done) {
        console.log(thesesClassifier.theses2017[398]);
        console.log('================');
        console.log(thesesClassifier.theses2017[398].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[398], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[398],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test398-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[398],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test399-1', function(done) {
        console.log(thesesClassifier.theses2017[399]);
        console.log('================');
        console.log(thesesClassifier.theses2017[399].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[399], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[399],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test399-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[399],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test400-1', function(done) {
        console.log(thesesClassifier.theses2017[400]);
        console.log('================');
        console.log(thesesClassifier.theses2017[400].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[400], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[400],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test400-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[400],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test401-1', function(done) {
        console.log(thesesClassifier.theses2017[401]);
        console.log('================');
        console.log(thesesClassifier.theses2017[401].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[401], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[401],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test401-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[401],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test402-1', function(done) {
        console.log(thesesClassifier.theses2017[402]);
        console.log('================');
        console.log(thesesClassifier.theses2017[402].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[402], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[402],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test402-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[402],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test403-1', function(done) {
        console.log(thesesClassifier.theses2017[403]);
        console.log('================');
        console.log(thesesClassifier.theses2017[403].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[403], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[403],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test403-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[403],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test404-1', function(done) {
        console.log(thesesClassifier.theses2017[404]);
        console.log('================');
        console.log(thesesClassifier.theses2017[404].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[404], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[404],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test404-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[404],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test405-1', function(done) {
        console.log(thesesClassifier.theses2017[405]);
        console.log('================');
        console.log(thesesClassifier.theses2017[405].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[405], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[405],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test405-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[405],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test406-1', function(done) {
        console.log(thesesClassifier.theses2017[406]);
        console.log('================');
        console.log(thesesClassifier.theses2017[406].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[406], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[406],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test406-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[406],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test407-1', function(done) {
        console.log(thesesClassifier.theses2017[407]);
        console.log('================');
        console.log(thesesClassifier.theses2017[407].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[407], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[407],classifier, CLASS_TYPE)).to.be.equal('Cyber-Security');
        done();
    });

    it('Test407-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[407],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test408-1', function(done) {
        console.log(thesesClassifier.theses2017[408]);
        console.log('================');
        console.log(thesesClassifier.theses2017[408].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[408], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[408],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test408-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[408],classifier, CLASS_TYPE2)[1]).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test409-1', function(done) {
        console.log(thesesClassifier.theses2017[409]);
        console.log('================');
        console.log(thesesClassifier.theses2017[409].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[409], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[409],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test409-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[409],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test410-1', function(done) {
        console.log(thesesClassifier.theses2017[410]);
        console.log('================');
        console.log(thesesClassifier.theses2017[410].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[410], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[410],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test410-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[410],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test411-1', function(done) {
        console.log(thesesClassifier.theses2017[411]);
        console.log('================');
        console.log(thesesClassifier.theses2017[411].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[411], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[411],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test411-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[411],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test412-1', function(done) {
        console.log(thesesClassifier.theses2017[412]);
        console.log('================');
        console.log(thesesClassifier.theses2017[412].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[412], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[412],classifier, CLASS_TYPE)).to.be.equal('Software Engineering');
        done();
    });

    it('Test412-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[412],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test413-1', function(done) {
        console.log(thesesClassifier.theses2017[413]);
        console.log('================');
        console.log(thesesClassifier.theses2017[413].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[413], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[413],classifier, CLASS_TYPE)).to.be.equal('Interaction and Visualization');
        done();
    });

    it('Test413-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[413],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test414-1', function(done) {
        console.log(thesesClassifier.theses2017[414]);
        console.log('================');
        console.log(thesesClassifier.theses2017[414].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[414], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[414],classifier, CLASS_TYPE)).to.be.equal('Algorithms and Applications');
        done();
    });

    it('Test414-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[414],classifier, CLASS_TYPE2)[1]).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test415-1', function(done) {
        console.log(thesesClassifier.theses2017[415]);
        console.log('================');
        console.log(thesesClassifier.theses2017[415].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[415], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[415],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
        done();
    });

    it('Test415-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[415],classifier, CLASS_TYPE2)[1]).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test416-1', function(done) {
        console.log(thesesClassifier.theses2017[416]);
        console.log('================');
        console.log(thesesClassifier.theses2017[416].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[416], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[416],classifier, CLASS_TYPE)).to.be.equal('Games');
        done();
    });

    it('Test416-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[416],classifier, CLASS_TYPE2)[1]).to.be.equal('Software Engineering');
        done();
    });

    it('Test417-1', function(done) {
        console.log(thesesClassifier.theses2017[417]);
        console.log('================');
        console.log(thesesClassifier.theses2017[417].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[417], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[417],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test417-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[417],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test418-1', function(done) {
        console.log(thesesClassifier.theses2017[418]);
        console.log('================');
        console.log(thesesClassifier.theses2017[418].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[418], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[418],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test418-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[418],classifier, CLASS_TYPE2)[1]).to.be.equal('Bioinformatics and Computational Biology');
        done();
    });

    it('Test419-1', function(done) {
        console.log(thesesClassifier.theses2017[419]);
        console.log('================');
        console.log(thesesClassifier.theses2017[419].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[419], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[419],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
        done();
    });

    it('Test419-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[419],classifier, CLASS_TYPE2)[1]).to.be.equal('Intelligent Systems');
        done();
    });

    it('Test420-1', function(done) {
        console.log(thesesClassifier.theses2017[420]);
        console.log('================');
        console.log(thesesClassifier.theses2017[420].title);
        console.log('================');
        console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[420], classifier));
        expect(thesesClassifier.classify(thesesClassifier.theses2017[420],classifier, CLASS_TYPE)).to.be.equal('Enterprise and Information Systems');
        done();
    });

    it('Test420-2', function(done) {
        expect(thesesClassifier.getFirstTwoLabels(thesesClassifier.theses2017[420],classifier, CLASS_TYPE2)[1]).to.be.equal('Games');
        done();
    });









});

