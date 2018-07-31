const natural = require("natural");
//const bClassifier = new natural.BayesClassifier();
const bClassifierThesis = new natural.BayesClassifier(null,0.1);
const thesesClassifier = require("./bn.js");
const tokenizer = new natural.CaseTokenizer();
const sw = require('stopword');
const ba_logger = require('../../log/ba_logger');
const threshold = 0.5;
var htmlparser = require("htmlparser2");
const fs = require('fs'),
  path = require('path'),
  filePath = path.join(__dirname, "../../files/tTrad.html");

const util = require('util');
var HashMap = require('hashmap');



let ThesisTypes = ["Projecto", "Dissertação", "Empresa"];

class ThesisServices {
    constructor() {
        this.processThesis = processThesis;
        this.trainSaveClassifierUsingLink = trainSaveClassifierUsingLink;
        this.trainSaveClassifier = trainSaveClassifier;
        this.parseThesis = parseThesis;
        this.printThesesArray = printThesesArray;
    }
}

let thesis_services = module.exports = exports = new ThesisServices();

function parseThesis(callback)    {

    let parsedTheses = [];

    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data) {

        let handler = new htmlparser.DomHandler(function (error, dom) {
            if (error)  {
                callback(error,null,null);
            }
            else    {

                //Path to table responsive is children[3].children[7].children[1].children[3].children[9].children[7].children[3].children[3]
                //Path to table  is  dom[4].children[3].children[7].children[1].children[3].children[9].children[7].children[3].children[3].children[1]
                //Path to table head is dom[4].children[3].children[7].children[1].children[3].children[9].children[7].children[3].children[3].children[1].children[1].name);
                //Path to table body is dom[4].children[3].children[7].children[1].children[3].children[9].children[7].children[3].children[3].children[1].children[3].name);

                //Table body holds tr. Each tr corresponds to one master thesis
                let tableBody = dom[4].children[3].children[7].children[1].children[3].children[9].children[7].children[3].children[3].children[1].children[3];


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

                //Here one can print after geral computation
                //printThesesArray(parsedTheses, "");
                //console.log("Number of total parsed thesis is: "+ parsedTheses.length);

                //TODO Just save sometimes
                //saveFile(parsedTheses,"ParsedTheses");

                callback(null, parsedTheses, parsedTheses.length)

            }

            //End of DOM parser
        }, {normalizeWhitespace: true, withStartIndices: true});


        let parser = new htmlparser.Parser(handler);
        parser.write(data);
        parser.end();

        //End of reading file callback
    });



}

function trainSaveClassifierUsingLink(link, callback) {
    //Loads data from link and trains the current classifier. Saves it
}


function trainSaveClassifier(type, callback) {

    //TODO use loaded thesis instead of hardcoded solution
    //TODO It seems that if several requests are made without restarting the server, classifier.save will
       //TODO increment info on the file

    let classifier = thesesClassifier.train(type);

    if (fs.existsSync(path.join(__dirname, "../../files/Thesis/bClassifier.json"))) {
        fs.unlinkSync(path.join(__dirname, "../../files/Thesis/bClassifier.json"));
    }
    classifier.save(path.join(__dirname, "../../files/Thesis/bClassifier.json"),  function(err, classifierS) {
        if (err)    {
            console.log(err);
            callback(err,null);
        } else {
            ba_logger.ba("BA|"+ "TRAIN|" + "CLASSIFIER_SAVED|" + new Date());
        }
    });

    callback(null,classifier);

}

//Parses thesis from HTML document generated by Fenix at:
//https://fenix.tecnico.ulisboa.pt/student/finalists/studentCandidacies


//Receives a raw thesis and returns a categorized thesis
function processThesis (theses, callback)   {

    console.log("processThesis- Serviços,incio");

    // Categorias

    //load classifier
    //stem, remove stop words
    //classify thesis based on req, obj? etc
    let classifiedTheses = {};
    classifiedTheses.theses = [];
    classifiedTheses.projectsNumber = 0;
    classifiedTheses.companyNumber = 0;

    let thesisNumber = theses.length;
    let projectsNumber = 0;
    let dissertationNumber = 0;
    let companyNumber = 0;

    //Receives theses array, and asks the user for classification.
    //Sends the classifier

    let titlesTheses = [];


    //Using Naive Bayes to determine if the thesis is a project or dissertation, and if there is a company evolved
    let classifier = thesesClassifier.train(2);
        //Build array of objects to store.
        for (let i = 0; i < thesisNumber; i++)  {


            if (theses[i].title.includes("Project") || theses[i].title.includes("PROJECT") ||
                theses[i].title.includes("Projecto") || theses[i].title.includes("PROJECTO"))    {
                projectsNumber ++;
                theses[i].type = "Project";
                theses[i].title = theses[i].title.replace('(PROJECT)','');
                theses[i].title = theses[i].title.replace('(Project)','');
                theses[i].title = theses[i].title.replace('Project -','');
                theses[i].title = theses[i].title.replace('Project:','');
                theses[i].title = theses[i].title.replace('PROJECT:','');
                theses[i].title = theses[i].title.replace('Projecto:','');
                theses[i].title = theses[i].title.replace('PROJECTO:','');

            } else  {
                //Default case
                theses[i].title = theses[i].title.replace('Dissertação:','');
                theses[i].title = theses[i].title.replace('DISSERTAÇÃO:','');
                theses[i].title = theses[i].title.replace('Dissertation:','');
                theses[i].title = theses[i].title.replace('Dissertation -','');
                theses[i].title = theses[i].title.replace('DISSERTATION:','');
                theses[i].title = theses[i].title.replace('(DISSERTATION)','');
                theses[i].title = theses[i].title.replace('[Dissertation]','');
                theses[i].title = theses[i].title.replace('[Thesis]:','');
                theses[i].title = theses[i].title.replace('Thesis:','');
                theses[i].title = theses[i].title.replace('[Thesis]','');
                theses[i].title = theses[i].title.replace('Thesis -','');
                dissertationNumber ++;
                theses[i].type = "Dissertation";
            }
            theses[i].areas = thesesClassifier.getFirstTwoLabels(theses[i],classifier);

            //classify project or disseration
            }
            return callback(null,theses, projectsNumber, dissertationNumber);



}
function addThesis ()   {
    //recebe info de tese, processa-a e adiciona-a a BD
}

//Classifier: An algorithm that maps the input data to a specific category.

//Classification model: A classification model tries to draw some conclusion from the input values given for training. It will predict the class labels/categories for the new data.

//Multi label classification: Classification task where each sample is mapped to a set of target labels (more than one class).

function saveFile(data, name) {
    fs.writeFile(path.join(__dirname,"../../files/" + name + ".txt"), util.inspect(data), function(err) {
        if(err) {
            return console.log(err);
        }

        ba_logger.ba("BA|"+ "FILE_SAVED|" + name + "|" + new Date());
    });

}

function printThesesArray(array, id)    {

    if (id) {
        console.log("ha id");
        for (let i = 0; i < array.length; i++)  {
            if (array[i].id = id)    {
                console.log("===================");
                console.log(array[i]);
                console.log("===================");
                console.log();
                return;
            }
        }
    } else {
        for (let i = 0; i < array.length; i++)  {
            console.log("===================");
            console.log(array[i]);
            console.log("===================");
            console.log();
        }
    }
}


function printThesesArraySimplified(array, id)    {

    if (id) {
        console.log("ha id");
        for (let i = 0; i < array.length; i++)  {
            if (array[i].id = id)    {
                console.log("===================");
                console.log("ID| " + array[i].id);
                console.log("TITLE| " + array[i].title);
                console.log("REQ| " + array[i].requirements);
                console.log("AREAS| " + array[i].areas);
                console.log("===================");
                console.log();
                return;
            }
        }
    } else {
        for (let i = 0; i < array.length; i++)  {
            console.log("===================");
            console.log("ID| " + array[i].id);
            console.log("TITLE| " + array[i].title);
            console.log("REQ| " + array[i].requirements);
            console.log("AREAS| " + array[i].areas);
            console.log("===================");
            console.log();
        }
    }
}