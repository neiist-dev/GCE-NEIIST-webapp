const natural = require("natural");
const path = require('path');
let htmlparser = require("htmlparser2");
bClassifierThesis = new natural.BayesClassifier();
natural.PorterStemmer.attach();
const util = require('util');
const DBAccess = require('../mongodb/accesses/mongo-access');
const fs = require('fs');
const MEIC_MODULE_1 = require('./theses-modules/MEIC_1');
const MEIC_MODULE_2 = require('./theses-modules/MEIC_2');
const MEIC_MODULE_3 = require('./theses-modules/MEIC_3');

class ThesesServices {
    constructor() {
        this.trainClassifier = trainClassifier;
        this.saveClassifier = saveClassifier;
        this.parseTheses = parseTheses;
        this.saveParsedThesesOnFile = saveParsedTheses;
        this.classifyThesesByFile = classifyThesesByFile;
        this.saveClassifiedTheses = saveClassifiedTheses;
        this.loadClassifier = loadClassifier;
        this.loadClassifiedTheses = loadClassifiedTheses;
        this.classifyAux = classifyAux;
        this.saveClassifiedThesesOnDB = saveClassifiedThesesOnDB;
        this.thesisBackup = thesisBackup;
        this.getTheses = getTheses;
        this.classifyTheses = classifyTheses;
        this.classifyThesesSpecialization = classifyThesesSpecialization;
        this.saveClassifiedThesesOnDBAreaAndSpecialization = saveClassifiedThesesOnDBAreaAndSpecialization;
        this.getThesesBySpecialization = getThesesBySpecialization;
        this.getThesesByAdvisor = getThesesByAdvisor;
        this.getThesesByAreaAndAdvisor = getThesesByAreaAndAdvisor;
        this.areaDump = areaDump;
        this.getThesesByFenixCourse= getThesesByFenixCourse;
    }
}


let thesesServices = module.exports = exports = new ThesesServices();


async function getThesesBySpecialization(areas)   {
    return await DBAccess.thesis.getThesisRecomendation(areas);
}

async function getThesesByAdvisor(advisor)   {
    return await DBAccess.thesis.getThesisRecomendationByAdvisor(advisor);
}

async function getThesesByFenixCourse(course)   {
    return await DBAccess.thesis.getThesesByFenixCourse(course);
}

async function getThesesByAreaAndAdvisor(area, advisor)   {
    return await DBAccess.thesis.getThesisRecomendationByAreaAndAdvisor(area, advisor);
}

async function trainClassifier (type = "1") {
    let classifier;

    switch (type) {
        case "specialization_MEIC":
            return await MEIC_MODULE_1.getScientificAreasClassifier();

        case "2":
            return classifier = await MEIC_MODULE_2.oldGetSpecializationAreasClassifier();

        case "MEIC":
            return await MEIC_MODULE_3.getProfessorsClassifier();
        default:
            return "Error";
    }

}


async function saveClassifier (classifier,latestId)    {
    const classfierPath = path.join(__dirname, '../files/Thesis/c' + latestId +'.json');
    classifier.save(classfierPath, function(err) {
        if (err) {
            throw new Error(err);
        } else {
            console.log('Classifier saved on ' + classfierPath + ' at time: ' + new Date().toGMTString());
        }
    });

}


async function parseTheses(latestId, specificFile)    {
    let filePath;

    if (!specificFile)   {
        filePath = path.join(__dirname, "../files/Thesis/f" + latestId + ".html");
    } else  {
        filePath =  path.join(__dirname, "../files/Thesis/"+ specificFile + ".html");
    }

    let parsedTheses = [];
    const readFile = util.promisify(fs.readFile);
    try {
        let data = await readFile(filePath,{encoding: 'utf-8'});
        let handler = new htmlparser.DomHandler(function (error, dom) {
            if (error)  {
                throw new Error(error);
            }
            else    {

                /*
                * Instructions:
                * Get a file with thesis on ESTUDANTE -> Candidatura a Dissertação -> Available Proposals
                * Delete everything above the theses' beggining on <tbody>. Delete everything after </tbody>
                * */
                let tableBody = dom[1];

                tableBody.children.forEach((element)=>  {
                    if (element.type === "tag" && element.name === "tr")  {

                        let oneThesis = {
                            id: "",
                            title: "",
                            supervisors: "",
                            vacancies: "",
                            location: "",
                            courses: "",
                            observations: "",
                            objectives: "",
                            status: "",
                            requirements: "",
                            areas: "",
                            type: ""
                        };


                        //contém os td's com info
                        let trChild = element.children;

                        //We have td's in iterations 1,3,5,7,9,11
                        let i = 0;
                        //Entre texto (espaços) e tds, trChild tem 13 elementos
                        //há 6 td's, alguns com info nested
                        trChild.forEach((subelement)=>  {
                            if (subelement.type === "tag" && subelement.name === "td")  {

                                //ID
                                if (i === 1)    {
                                    //console.log("Case 1, ID");
                                    let id = subelement.children[0].data;
                                    if (id === null)    {
                                        callback("ID of thesis is not defined", null, null);
                                    }
                                    oneThesis.id = id;
                                }

                                //Title
                                if (i === 3)    {
                                    //console.log("Case 3, Title");
                                    let title = subelement.children[0].data;
                                    oneThesis.title = title;
                                }

                                //Supervisors
                                if (i === 5)    {
                                    //console.log("Case 5, Superv");
                                    let elementsNumber = subelement.children.length;
                                    let arraySupervisors = [];
                                    //let supervisorsNumber = (elementsNumber - 1) / 2;
                                    for (let j = 1; j < elementsNumber; j = j+2)  {
                                        let supervisorDiv = subelement.children[j];
                                        let supervisor = supervisorDiv.children[0].data;
                                        arraySupervisors.push(supervisor);
                                    }


                                    oneThesis.supervisors = arraySupervisors;
                                }

                                //Vacancies
                                if (i === 7)    {
                                    //console.log("Caso 7, Vac");
                                    let vacancies = subelement.children[0].data;
                                    oneThesis.vacancies = vacancies;
                                }

                                if (i === 9)    {
                                    //console.log("Caso 9, status");
                                    let status = subelement.children[1].children[0].data;
                                    if (status === "Not assigned")    {
                                        status = "Unassigned";
                                    }
                                    oneThesis.status = status;
                                }

                                if (i === 11)    {
                                    //TODO: Impact of \n and \t at FE. Remove?
                                    //console.log("Caso 11, General");
                                    let info = subelement.children[1].children[3].children[5];

                                    let observations = info.attribs["data-observations"];
                                    if(observations)    {
                                        observations = observations.replace("\t",": ");
                                    }
                                    oneThesis.observations = observations;

                                    let requirements = info.attribs["data-requirements"];
                                    if (requirements)   {
                                        requirements = requirements.replace("\t",": ");
                                        requirements = requirements.replace("\n","");
                                    }
                                    oneThesis.requirements = requirements;

                                    let objectives = info.attribs["data-goals"];
                                    oneThesis.objectives = objectives;

                                    let location = info.attribs["data-localization"];
                                    oneThesis.location = location;


                                    let courses = info.attribs["data-degrees"];
                                    oneThesis.courses = courses;

                                }

                            }

                            //Last iteration, push thesis to array.
                            if (i === 12)   {
                                parsedTheses.push(oneThesis);
                            }

                            i++;
                        });

                        //console.log("Processed Thesis. ID: "+ oneThesis.id);
                        //console.log("Processed Thesis Number: "+ parsedTheses.length);


                    }

                    //For each thesis


                });
            }

            //End of DOM parser
        }, {normalizeWhitespace: true, withStartIndices: true});
        let parser = new htmlparser.Parser(handler);
        parser.write(data);
        parser.end();
        return parsedTheses;
    } catch (e) {
        throw new Error(e);
    }

}

async function saveParsedTheses(parsedTheses, latestId) {
    const filePath =  path.join(__dirname, "../files/Thesis/p" + latestId + ".json");
    const toWrite = JSON.stringify(parsedTheses);
    fs.writeFileSync(filePath, toWrite, 'utf8', (err) => {
        if (err) {
            throw new Error(err);
        }
        console.log("The file was saved!");
    });
}

async function getTheses ()  {
    return  await DBAccess.thesis.getThesis();
}
async function thesisBackup(theses) {
    const filePath = path.join(__dirname, "../files/Thesis/b" + new Date().getTime() + ".json");
    const toWrite = JSON.stringify(theses);
    fs.writeFileSync(filePath, toWrite, (err) => {
        if (err) {
            return (err);
        }
        console.log("The file was saved!");
    });

}

async function loadClassifier(latestId) {
    let classifierFilePath = path.join(__dirname, "../files/Thesis/c" + latestId + ".json");
    const readFile = util.promisify(fs.readFile);
    let rawClassifier = await readFile(classifierFilePath, {encoding: 'utf-8'});
    return await natural.BayesClassifier.restore(JSON.parse(rawClassifier));
}

async function loadTheses(latestId = 0, specificFile = null) {
    const readFile = util.promisify(fs.readFile);
    let parsedTheses = [];

    let thesesFilePath;

    if (latestId)   {
        thesesFilePath = path.join(__dirname, "../files/Thesis/p" + latestId + ".json");
    } else  {
        thesesFilePath  =  path.join(__dirname, "../files/Thesis/p" + specificFile + ".json");

    }
    try {
        let theses = await readFile(thesesFilePath, {encoding: 'utf-8'});
        parsedTheses = JSON.parse(theses);
        return parsedTheses;
    } catch (e) {
        throw new Error(e);
    }
}

async function classifyThesesByFile(latestId, specificFile, trainingCase = 1) {
    let classifiedTheses = [];

    //load classifier and theses
    try {
        let restoredClassifier = await loadClassifier(latestId || specificFile);
        let parsedTheses = await loadTheses(latestId, specificFile);
        return await classifyAux(parsedTheses,restoredClassifier, trainingCase);
    } catch (e) {
        throw new Error(e);
    }

}

async function classifyAux(theses,classifier, trainingCase) {
    theses.map(thesis =>        thesis.title.tokenizeAndStem().includes("project") ||
                                thesis.title.tokenizeAndStem().includes("projecto") ||
                                thesis.title.tokenizeAndStem().includes("projeto") ?
                                thesis.type = "Project"  : thesis.type = "Dissertation");

    theses.map(thesis =>       thesis.areas = getFirstTwoLabels(thesis,classifier,trainingCase));

    return theses;
}

function getFirstTwoLabels (thesis, classifier, type) {
    var criteria = "";
    switch(type) {
        case "0":
            criteria = thesis.title;
            break;
        case "1":
            criteria = thesis.title + " " + thesis.objectives;
            break;
        case "2":
            criteria = thesis.title + " " + thesis.requirements;
            break;
        case "3":
            criteria = thesis.title + " " + thesis.objectives + " " + thesis.requirements;
            break;
        case "4":
            criteria = thesis.title + " " + thesis.location;
            break;
        //Advisors
        case "5":
            for (let advisor of thesis.supervisors) {
                //Supervisor is not from IST
                if (advisor.includes("@"))   {
                    break;
                }
                //consider tokenizing and stemming
                advisor = advisor.substr(0, advisor.indexOf('('));
                advisor = advisor.trim();
                let array = advisor.split(" ");
                for (let name of array)  {
                    advisor = name + "_";
                    criteria = criteria + advisor;

                }
                criteria = criteria.substr(0, criteria.length - 1);
                criteria = criteria + " ";
            }
            break;
        //Advisors + Title
        case "6":
            for (let advisor of thesis.supervisors) {
                //Supervisor is not from IST
                if (advisor.includes("@"))   {
                    break;
                }
                //consider tokenizing and stemming
                advisor = advisor.substr(0, advisor.indexOf('('));
                advisor = advisor.trim();
                let array = advisor.split(" ");
                for (let name of array)  {
                    advisor = name + "_";
                    criteria = criteria + advisor;

                }
                criteria = criteria.substr(0, criteria.length - 1);
                criteria = criteria + " ";
            }
            criteria = criteria + thesis.title;
            break;
        default:
            criteria = thesis.title;
    }

    let classArray = [];
    var classifications = classifier.getClassifications(criteria);
    classifications.forEach(function(classPlusProbability) {
        classArray.push(classPlusProbability.label)
    });
    return classArray.slice(0,2)

}

async function saveClassifiedTheses(classifiedTheses, latestId) {
    const filePath =  path.join(__dirname, "../files/Thesis/t" + latestId + ".json");
    const toWrite = JSON.stringify(classifiedTheses);
    fs.writeFileSync(filePath, toWrite, (err) => {
        if (err) {
            return (err);
        }
        console.log("The file was saved!");
    });
}

async function loadClassifiedTheses(latestId = 0, specificFile = null) {
    const readFile = util.promisify(fs.readFile);
    let parsedTheses = [];

    let thesesFilePath;

    if (latestId)   {
        thesesFilePath = path.join(__dirname, "../files/Thesis/t" + latestId + ".json");
    } else  {
        thesesFilePath  =  path.join(__dirname, "../files/Thesis/t" + specificFile + ".json");

    }
    try {
        let theses = await readFile(thesesFilePath, {encoding: 'utf-8'});
        parsedTheses = JSON.parse(theses);
        return parsedTheses;
    } catch (e) {
        throw new Error(e);
    }
}

async function saveClassifiedThesesOnDB(theses) {
    try {
        theses.map (async thesis => await DBAccess.thesis.asyncAddThesis(thesis.id, thesis.title, thesis.supervisors,
            thesis.vacancies, thesis.location, thesis.courses,
            thesis.observations, thesis.objectives, thesis.status,
            thesis.requirements, thesis.areas, 0 , thesis.type, thesis.fenixCourse, new Date()))
    } catch (e) {
        throw new Error(e);
    }
}
async function saveClassifiedThesesOnDBAreaAndSpecialization(theses) {
    try {
        theses.map (async thesis => await DBAccess.thesis.asyncAddThesisSpecialization(thesis.id, thesis.title, thesis.supervisors,
            thesis.vacancies, thesis.location, thesis.courses,
            thesis.observations, thesis.objectives, thesis.status,
            thesis.requirements, thesis.areas, thesis.specializationAreas, 0 , thesis.type, thesis.fenixCourse, new Date()))
    } catch (e) {
        throw new Error(e);
    }
}


async function classifyTheses (theses, classifier, trainingCase)  {
    theses.map(thesis =>        thesis.title.tokenizeAndStem().includes("dissertation") ||
    thesis.title.tokenizeAndStem().includes("dissertaçâo") ||
    thesis.title.tokenizeAndStem().includes("dissertaçâo") ||
    thesis.title.tokenizeAndStem().includes("dissertacao") ||
    thesis.title.tokenizeAndStem().includes("dissertaçao") ?
        thesis.type = "Dissertation"  : thesis.type = "Project");
    theses.map(thesis =>       thesis.areas = getFirstTwoLabels(thesis,classifier,trainingCase));

    return theses;
}
async function classifyThesesSpecialization (theses, classifier, trainingCase)  {
    theses.map(thesis =>       thesis.specializationAreas = getFirstTwoLabels(thesis,classifier,trainingCase));
    return theses;
}

async function areaDump (theses, course)  {
    //Alternatively, instead of using the course, test waht is in thesis.courses
    /*
    theses.map((thesis) => {
        if (thesis.courses.includes("MEIC-A") || thesis.courses.includes("MEIC-T")) {
            thesis.fenixCourse = "Engenharia Informática e de Computadores";
        }
    });
    */

    theses.map((thesis) => {
        switch (course) {
            case "MEIC":
                thesis.fenixCourse = "Engenharia Informática e de Computadores";
                break;
        }
    });

    return theses;
}
/*

    classificationLabels: function(thesis, bClassifierThesis,type) {
            var criteria;
            switch(type) {
                case 0:
                    criteria = thesis.title;
                    break;
                case 1:
                    criteria = thesis.title + " " + thesis.objectives;
                    break;
                case 2:
                    criteria = thesis.title + " " + thesis.requirements;
                    break;
                case 3:
                    criteria = thesis.title + " " + thesis.objectives + " " + thesis.requirements;
                    break;
                case 4:
                    criteria = thesis.title + " " + thesis.location;
                    break;
                default:
                    criteria = thesis.title;
            }

            var classifications = bClassifierThesis.getClassifications(criteria);
            classifications.forEach(function(classPlusProbability) {
                console.log('Class ' + classPlusProbability.label + ' : ' + classPlusProbability.value);
            });

    },

    getFirstTwoLabels: function(thesis, bClassifierThesis, type) {
        var criteria;
        switch(type) {
            case 0:
                criteria = thesis.title;
                break;
            case 1:
                criteria = thesis.title + " " + thesis.objectives;
                break;
            case 2:
                criteria = thesis.title + " " + thesis.requirements;
                break;
            case 3:
                criteria = thesis.title + " " + thesis.objectives + " " + thesis.requirements;
                break;
            case 4:
                criteria = thesis.title + " " + thesis.location;
                break;
            default:
                criteria = thesis.title;
        }

            let classArray = [];
            var classifications = bClassifierThesis.getClassifications(criteria);
            classifications.forEach(function(classPlusProbability) {
                classArray.push(classPlusProbability.label)
            });
            return classArray.slice(0,2)

    },

 */