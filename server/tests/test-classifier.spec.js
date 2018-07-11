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


    describe('FILE_1__TEST_1:NB Classifier, First Classification', function()  {
        before(function()   {

        });
        it('Load theses 2017', function(done) {

            expect(thesesClassifier.theses2017.length).to.be.equal(427);
            console.log("=============");
            console.log("Main classification, type: " + CLASS_TYPE);
            console.log("=============");
            console.log("Second classifier, type: " + CLASS_TYPE2);
            console.log("=============");
            console.log("Classifier, type: " + CLASSIFICATOR_TYPE);

            for (let j = 0; j < 427; j++)   {
                console.log('================');
                console.log(":" + j);
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

        it('Test0', function(done) {
            console.log(thesesClassifier.classificationLabels(thesesClassifier.theses2017[0], classifier));
            expect(thesesClassifier.classify(thesesClassifier.theses2017[0],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test1', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[1],classifier, CLASS_TYPE)).to.be.equal('Language and Information Technologies');
            done();
        });


        it('Test2', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[2],classifier, CLASS_TYPE)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test3', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[3],classifier, CLASS_TYPE)).to.be.equal('Games');
            done();
        });

        it('Test4', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[4],classifier, CLASS_TYPE)).to.be.equal('Games');
            done();
        });

        it('Test5', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[5],classifier, CLASS_TYPE)).to.be.equal('Games');
            done();
        });


        it('Test6', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[6], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        //should pass
        it('Test7', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[7], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test8', function(done) {

            expect(thesesClassifier.classify(thesesClassifier.theses2017[8], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test9', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[9], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test10', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[10], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test11', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[11], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        //todo should pass
        it('Test12', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[12], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test13', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[13], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        //todo should pass
        it('Test14', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[14], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test15', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[15], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test16', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[16], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test17', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[17], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test18', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[18], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test19', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[19], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test20', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[20], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test21', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[21], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test22', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[22], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test23', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[23], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test24', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[24], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test25', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[25], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test26', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[26], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test27', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[27], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test28', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[28], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test29', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[29], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test30', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[30], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test31', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[31], classifier)).to.be.equal('Games');
            done();
        });

        it('Test32', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[32], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test33', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[33], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test34', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[34], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test35', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[35], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test36', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[36], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test37', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[37], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test38', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[38], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test39', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[39], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test40', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[40], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test41', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[41], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test42', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[42], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test43', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[43], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test44', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[44], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test45', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[45], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test46', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[46], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test47', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[47], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test48', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[48], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test49', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[49], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test50', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[50], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test51', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[51], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test52', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[52], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test53', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[53], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test54', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[54], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test55', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[55], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test56', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[56], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test57', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[57], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test58', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[58], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test59', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[59], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test60', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[60], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test61', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[61], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test62', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[62], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test63', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[63], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test64', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[64], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test65', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[65], classifier)).to.be.equal('Games');
            done();
        });

        it('Test66', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[66], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test67', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[67], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test68', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[68], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test69', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[69], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test70', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[70], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test71', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[71], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test72', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[72], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test73', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[73], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test74', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[74], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test75', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[75], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test76', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[76], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test77', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[77], classifier)).to.be.equal('Games');
            done();
        });

        it('Test78', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[78], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test79', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[79], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test80', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[80], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test81', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[81], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test82', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[82], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test83', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[83], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test84', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[84], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test85', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[85], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test86', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[86], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test87', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[87], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test88', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[88], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test89', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[89], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test90', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[90], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test91', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[91], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test92', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[92], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test93', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[93], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test94', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[94], classifier)).to.be.equal('Games');
            done();
        });

        it('Test95', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[95], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test96', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[96], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test97', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[97], classifier)).to.be.equal('Games');
            done();
        });

        it('Test98', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[98], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test99', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[99], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test100', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[100], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test101', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[101], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test102', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[102], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test103', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[103], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test104', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[104], classifier)).to.be.equal('Games');
            done();
        });

        it('Test105', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[105], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test106', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[106], classifier)).to.be.equal('Games');
            done();
        });

        it('Test107', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[107], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test108', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[108], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test109', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[109], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test110', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[110], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test111', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[111], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test112', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[112], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test113', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[113], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test114', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[114], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test115', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[115], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test116', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[116], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test117', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[117], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test118', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[118], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test119', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[119], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test120', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[120], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test121', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[121], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test122', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[122], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test123', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[123], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test124', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[124], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test125', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[125], classifier)).to.be.equal('Games');
            done();
        });

        it('Test126', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[126], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test127', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[127], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test128', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[128], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test129', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[129], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test130', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[130], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test131', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[131], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test132', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[132], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test133', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[133], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test134', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[134], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test135', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[135], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test136', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[136], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test137', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[137], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test138', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[138], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test139', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[139], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test140', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[140], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test141', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[141], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test142', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[142], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test143', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[143], classifier)).to.be.equal('Games');
            done();
        });

        it('Test144', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[144], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test145', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[145], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test146', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[146], classifier)).to.be.equal('Games');
            done();
        });

        it('Test147', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[147], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test148', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[148], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test149', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[149], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test150', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[150], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test151', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[151], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test152', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[152], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test153', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[153], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test154', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[154], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test155', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[155], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test156', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[156], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test157', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[157], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test158', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[158], classifier)).to.be.equal('Games');
            done();
        });

        it('Test159', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[159], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test160', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[160], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test161', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[161], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test162', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[162], classifier)).to.be.equal('Games');
            done();
        });

        it('Test163', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[163], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test164', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[164], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test165', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[165], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test166', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[166], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test167', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[167], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test168', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[168], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test169', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[169], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test170', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[170], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test171', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[171], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test172', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[172], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test173', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[173], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test174', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[174], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test175', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[175], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test176', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[176], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test177', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[177], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test178', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[178], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test179', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[179], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test180', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[180], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test181', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[181], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test182', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[182], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test183', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[183], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test184', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[184], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test185', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[185], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test186', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[186], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test187', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[187], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test188', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[188], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test189', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[189], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test190', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[190], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test191', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[191], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test192', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[192], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test193', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[193], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test194', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[194], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test195', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[195], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test196', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[196], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test197', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[197], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test198', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[198], classifier)).to.be.equal('Games');
            done();
        });

        it('Test199', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[199], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test200', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[200], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test201', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[201], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test202', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[202], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test203', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[203], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test204', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[204], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test205', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[205], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test206', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[206], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test207', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[207], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test208', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[208], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test209', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[209], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test210', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[210], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test211', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[211], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test212', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[212], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test213', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[213], classifier)).to.be.equal('Games');
            done();
        });

        it('Test214', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[214], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test215', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[215], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test216', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[216], classifier)).to.be.equal('Games');
            done();
        });

        it('Test217', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[217], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test218', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[218], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test219', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[219], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test220', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[220], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test221', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[221], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test222', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[222], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test223', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[223], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test224', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[224], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test225', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[225], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test226', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[226], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test227', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[227], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test228', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[228], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test229', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[229], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test230', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[230], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test231', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[231], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test232', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[232], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test233', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[233], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test234', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[234], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test235', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[235], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test236', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[236], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test237', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[237], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test238', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[238], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test239', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[239], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test240', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[240], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test241', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[241], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test242', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[242], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test243', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[243], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test244', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[244], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test245', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[245], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test246', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[246], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test247', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[247], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test248', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[248], classifier)).to.be.equal('Games');
            done();
        });

        it('Test249', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[249], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test250', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[250], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test251', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[251], classifier)).to.be.equal('Games');
            done();
        });

        it('Test252', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[252], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test253', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[253], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test254', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[254], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test255', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[255], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test256', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[256], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test257', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[257], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test258', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[258], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test259', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[259], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test260', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[260], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test261', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[261], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test262', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[262], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test263', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[263], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test264', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[264], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test265', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[265], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test266', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[266], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test267', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[267], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test268', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[268], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test269', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[269], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test270', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[270], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test271', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[271], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test272', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[272], classifier)).to.be.equal('Games');
            done();
        });

        it('Test273', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[273], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test274', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[274], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test275', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[275], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test276', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[276], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test277', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[277], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test278', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[278], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test279', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[279], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test280', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[280], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test281', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[281], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test282', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[282], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test283', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[283], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test284', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[284], classifier)).to.be.equal('Games');
            done();
        });

        it('Test285', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[285], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test286', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[286], classifier)).to.be.equal('Games');
            done();
        });

        it('Test287', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[287], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });
        it('Test288', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[288], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test289', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[289], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test290', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[290], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test291', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[291], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test292', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[292], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test293', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[293], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test294', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[294], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test295', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[295], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test296', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[296], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test297', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[297], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test298', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[298], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test299', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[299], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test300', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[300], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test301', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[301], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test302', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[302], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test303', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[303], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test304', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[304], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test305', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[305], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test306', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[306], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test307', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[307], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test308', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[308], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test309', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[309], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test310', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[310], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test311', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[311], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test312', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[312], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test313', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[313], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test314', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[314], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test315', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[315], classifier)).to.be.equal('Games');
            done();
        });

        it('Test316', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[316], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test317', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[317], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test318', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[318], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test319', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[319], classifier)).to.be.equal('Games');
            done();
        });

        it('Test320', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[320], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test321', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[321], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test322', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[322], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test323', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[323], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test324', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[324], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test325', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[325], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test326', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[326], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test327', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[327], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test328', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[328], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test329', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[329], classifier)).to.be.equal('Games');
            done();
        });

        it('Test330', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[330], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test331', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[331], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test332', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[332], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test333', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[333], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test334', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[334], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test335', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[335], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test336', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[336], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test337', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[337], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test338', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[338], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test339', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[339], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test340', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[340], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test341', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[341], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test342', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[342], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test343', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[343], classifier)).to.be.equal('Games');
            done();
        });

        it('Test344', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[344], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test345', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[345], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test346', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[346], classifier)).to.be.equal('Games');
            done();
        });

        it('Test347', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[347], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test348', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[348], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test349', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[349], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test350', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[350], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test351', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[351], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test352', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[352], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test353', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[353], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test354', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[354], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test355', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[355], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test356', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[356], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test357', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[357], classifier)).to.be.equal('Games');
            done();
        });

        it('Test358', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[358], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test359', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[359], classifier)).to.be.equal('Games');
            done();
        });

        it('Test360', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[360], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test361', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[361], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test362', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[362], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test363', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[363], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test364', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[364], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test365', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[365], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test366', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[366], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test367', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[367], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test368', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[368], classifier)).to.be.equal('Language and Information Technologies');
            done();
        });

        it('Test369', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[369], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test370', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[370], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test371', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[371], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test372', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[372], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test373', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[373], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test374', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[374], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test375', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[375], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test376', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[376], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test377', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[377], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test378', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[378], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test379', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[379], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test380', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[380], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test381', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[381], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test382', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[382], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test383', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[383], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test384', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[384], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test385', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[385], classifier)).to.be.equal('Games');
            done();
        });

        it('Test386', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[386], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test387', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[387], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test388', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[388], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test389', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[389], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test390', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[390], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test391', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[391], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test392', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[392], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test393', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[393], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test394', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[394], classifier)).to.be.equal('Bioinformatics and Computational Biology');
            done();
        });

        it('Test395', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[395], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test396', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[396], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test397', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[397], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test398', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[398], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test399', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[399], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test400', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[400], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test401', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[401], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test402', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[402], classifier)).to.be.equal('Games');
            done();
        });

        it('Test403', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[403], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test404', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[404], classifier)).to.be.equal('Intelligent Systems');
            done();
        });

        it('Test405', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[405], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test406', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[406], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test407', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[407], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test408', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[408], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test409', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[409], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test410', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[410], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test411', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[411], classifier)).to.be.equal('Enterprise and Information Systems');
            done();
        });

        it('Test412', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[412], classifier)).to.be.equal('Cyber-Security');
            done();
        });

        it('Test413', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[413], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test414', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[414], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });

        it('Test415', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[415], classifier)).to.be.equal('Distributed and Cyberphysical Systems');
            done();
        });

        it('Test416', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[416], classifier)).to.be.equal('Games');
            done();
        });

        it('Test417', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[417], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test418', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[418], classifier)).to.be.equal('Software Engineering');
            done();
        });

        it('Test419', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[419], classifier)).to.be.equal('Interaction and Visualization');
            done();
        });

        it('Test420', function(done) {
            expect(thesesClassifier.classify(thesesClassifier.theses2017[420], classifier)).to.be.equal('Algorithms and Applications');
            done();
        });






    });

