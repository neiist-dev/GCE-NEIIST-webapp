const natural = require("natural");
const bClassifier = new natural.BayesClassifier();
const bClassifierThesis = new natural.BayesClassifier();

const tokenizer = new natural.CaseTokenizer();
const sw = require('stopword');
const ba_logger = require('../../log/ba_logger');
const threshold = 0.5;
var htmlparser = require("htmlparser2");
const fs = require('fs'),
  path = require('path'),
  filePath = path.join(__dirname, "../../files/tOrig.html");

const util = require('util')
var HashMap = require('hashmap');

let  Classes = [    "Engenharia de Software",
    "Sistemas Empresariais",
    "Tecnologia dos Sistemas Informáticos",
    "Sistemas Distribuídos",
    "Interação e Visualização",
    "Sistemas Inteligentes",
    "Sistemas de Informação",
    "Processamento e Análise de Dados",
    "Ciber-Segurança",
    "Jogos",
    "Tecnologia para Processamento de Informação e Linguagem",
    "Bioinformática e Biologia Computacional",
    "Sistemas Computacionais",
    "Robótica Inteligente",
    "IoT",
    "Algoritmos e Programação"

];

let ThesisTypes = ["Projecto", "Dissertação", "Empresa"];

class ThesisServices {
    constructor() {
        this.processThesis = processThesis;
        this.trainClassifierUsingLink = trainClassifierUsingLink;
        this.trainClassifier = trainClassifier;
        this.parseThesis = parseThesis;
        this.printThesesArray = printThesesArray;
    }
}

let thesis_services = module.exports = exports = new ThesisServices();

function parseThesis(callback)    {
    console.log("parseThesis - Serviços, inicio");

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
                                    oneThesis.status = status;
                                }

                                if (i === 11)    {
                                    //TODO: Impact of \n and \t at FE. Remove?
                                    //console.log("Caso 11, General");
                                    let info = subelement.children[1].children[3].children[5];

                                    let observations = info.attribs["data-observations"];
                                    observations = observations.replace("\t",": ");
                                    oneThesis.observations = observations;

                                    let requirements = info.attribs["data-requirements"];
                                    requirements = requirements.replace("\t",": ");
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
                saveFile(parsedTheses,"ParsedTheses");
                console.log("parseThesis- Serviços, antes callback");

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

function trainClassifierUsingLink(link, callback) {
    //Loads data from link and trains the current classifier. Saves it
}

//TODO: Vale a pena pequisar pelo ficheiro, carregar caso exista?
function trainClassifier(theses, callback) {

    const THESIS_NUMBER = theses.length;
    let projectsNumber = 0;
    let dissertationNumber = 0;
    let companyNumber = 0;
    let titlesTheses = [];
    var maxIterations = 100;
    var minImprovement = .01;
    //Using Naive Bayes to determine if the thesis is a project or dissertation, and if there is a company evolved
    //Naive Bayes assumes independent predictors.
    bClassifier.addDocument('Projecto', ThesisTypes[0]);
    bClassifier.addDocument('Project', ThesisTypes[0]);
    bClassifier.addDocument('Dissertação', ThesisTypes[1]);
    bClassifier.addDocument('Dissertation', ThesisTypes[1]);

    //Default are marked as "Projecto"
    bClassifier.addDocument('', ThesisTypes[0]);

    //TODO
    bClassifier.addDocument('Unlabel', ThesisTypes[2]);
    bClassifier.addDocument('Link Consulting', ThesisTypes[2]);

    //Train Classifier
    bClassifier.train();

    //////////////////////////////////////////////////////////////////////////////////
    bClassifierThesis.addDocument('',"Sem classificação");
    bClassifierThesis.addDocument('Large scale membership and consistency',"SD");
    bClassifierThesis.addDocument(["expressões texto","text expressions"],"SD");
    bClassifierThesis.addDocument(["dados","redes de sensores"],Classes[14]);
    bClassifierThesis.addDocument(["Internet-of-Things", "Domotics", "Domótica"],Classes[14]);
    bClassifierThesis.addDocument(["Gamification"],Classes[9]);
    bClassifierThesis.addDocument(["Classificação automática de textos", "Automatic classification of text"],Classes[10]);
    bClassifierThesis.addDocument(["Discourse analysis"],Classes[10]);
    bClassifierThesis.addDocument(["Enterprise integration Architecture", "Enterprise", "Empresarial"],Classes[1]);
    bClassifierThesis.addDocument(["Redes Complexas", "Complex Networks"],Classes[12]);
    bClassifierThesis.addDocument(["monolithic architecture","microservices architecture"],Classes[0]);
    bClassifierThesis.addDocument(["Aplicação Móvel","Mobile App"],Classes[0]);
    bClassifierThesis.addDocument(["P3","Processor", "Processador"],Classes[16]);
    bClassifierThesis.addDocument(["Security ","Malware", "Sofware security"],Classes[8]);
    bClassifierThesis.addDocument(["Sensing and Visualizaing", "Visualização", "Visualization"],Classes[4]);

    bClassifierThesis.train();



    //Build array of objects to store.
    for (let i = 0; i < THESIS_NUMBER; i++)  {
        console.log("TITULO, VARIA::" + theses[i].title);
        const result = bClassifier.classify(theses[i].title);
        theses[i].areas = result;

        if (result === ThesisTypes[0])    {
            projectsNumber ++;
        }

        if (result === ThesisTypes[1])    {
            dissertationNumber ++;
        }

        //Logging if is project or disseration and its score
        /*
        var classifications = bClassifier.getClassifications(theses[i].title);
        classifications.forEach(function(classPlusProbability) {
            console.log('Class ' + classPlusProbability.label + ' has score ' + classPlusProbability.value);
        });
        */
        //TODO Not working well
        var classifications = bClassifierThesis.getClassifications(theses[i].title);
        theses[i].areas = theses[i].areas + ", " + bClassifierThesis.classify(theses[i].title);
        classifications.forEach(function(classPlusProbability) {
            console.log('Class ' + classPlusProbability.label + ' has score ' + classPlusProbability.value);

        });

        console.log("==============");


    }
    //printThesesArraySimplified(theses);

    bClassifier.save(path.join(__dirname, "../../files/Thesis/bClassifier.json"), function(err, classifier) {
        if (err)    {
            console.err(err);
            callback(err,null);
        } else {
            ba_logger.ba("BA|"+ "CLASSIFIER_TYPE_SAVED|" + new Date());
            callback(null, projectsNumber + dissertationNumber);
        }
    });

    bClassifierThesis.save(path.join(__dirname, "../../files/Thesis/bClassifierThesis.json"), function(err, classifier) {
        if (err)    {
            console.err(err);
            callback(err,null);
        } else {
            ba_logger.ba("BA|"+ "CLASSIFIER_AREAS_SAVED|" + new Date());
            callback(null, projectsNumber + dissertationNumber);
        }
    });
}

//Parses thesis from HTML document generated by Fenix at:
//https://fenix.tecnico.ulisboa.pt/student/finalists/studentCandidacies


//Receives a raw thesis and returns a categorized thesis
function processThesis (theses, callback)   {
    console.log("processThesis- Serviços,incio");

    // Categorias
    /*

    0 - Engenharia de Software
    1 - Sistemas Empresariais
    2 - Tecnologia dos Sistemas Informáticos
    3 - Sistemas Distribuídos
    4 - Interação e Visualização
    5 - Sistemas Inteligentes
    6 - Sistemas de Informação
    7 - Processamento e Análise de Dados
    8 - Ciber-Segurança
    9 - Jogos
    10 - Tecnologia para Processamento de Informação e Linguagem
    11 - Bioinformática e Biologia Computacional
    12 - Sistemas Computacionais
    13 - Robótica Inteligente
    */

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
    natural.BayesClassifier.load(path.join(__dirname, "../../files/Thesis/bClassifier.json"), null, function(err, bClassifier) {
        //Build array of objects to store.
        for (let i = 0; i < thesisNumber; i++)  {


            titlesTheses[i] = {
                id: "",
                title: "",
                areas: ""
            };
            titlesTheses[i].id = theses[i].id;
            titlesTheses[i].title = theses[i].title;
            titlesTheses[i].areas = bClassifier.classify(theses[i].title);



            if (bClassifier.classify(theses[i].title) === ThesisTypes[0])    {
                projectsNumber ++;
            }

            if (bClassifier.classify(theses[i].title) === ThesisTypes[1])    {
                dissertationNumber ++;
            }

            theses[i].areas = bClassifier.classify(theses[i].title);

        }
        //TODO Check for errors






    });

    natural.BayesClassifier.load(path.join(__dirname, "../../files/Thesis/bClassifierThesis.json"), null, function(err, bClassifierThesis) {
        for (let i = 0; i < thesisNumber; i++) {
            theses[i].areas = theses[i].areas + ", " + bClassifierThesis.classify(theses[i].title);
        }
        return callback(null,theses, projectsNumber, dissertationNumber);

    });

}
function addThesis ()   {
    //recebe info de tese, processa-a e adiciona-a a BD
}

//Classifier: An algorithm that maps the input data to a specific category.

//Classification model: A classification model tries to draw some conclusion from the input values given for training. It will predict the class labels/categories for the new data.

//Multi label classification: Classification task where each sample is mapped to a set of target labels (more than one class).

function saveFile(data, name) {
    fs.writeFile(path.join(__dirname,"../../files/" + name + Date.now() + ".txt"), util.inspect(data), function(err) {
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