const natural = require("natural");
var PorterStemmer = natural.PorterStemmer;
let specClassifier = new natural.BayesClassifier(PorterStemmer,0.1);
natural.PorterStemmer.attach();

const CLASSES = [
    "Algorithms and Applications",
    "Bioinformatics and Computational Biology",
    "Cyber-Security",
    "Software Engineering",
    "Data Science and Engineering",
    "It Service Management",
    "Interaction and Visualization",
    "Games",
    "Intelligent Robotics",
    "Cyberphysical Systems",
    "Information Systems",
    "Distributed Systems",
    "Enterprise Systems",
    "Intelligent Systems",
    "Language and Information Technologies"
];


const CLASSES_PT = [
    "Algoritmos e Aplicações",
    "Bioinformática e Biologia Computacional",
    "Ciber-Segurança",
    "Engenharia de Software",
    "Engenharia e Ciência de Dados",
    "Gestão de Serviços It",
    "Interação e Visualização",
    "Jogos",
    "Robótica Inteligente",
    "Sistemas Ciberfísicos",
    "Sistemas de Informação",
    "Sistemas Distribuídos",
    "Sistemas Empresariais",
    "Sistemas Inteligentes",
    "Tecnologias da Informação e Linguagem",
];
//By specialization areas

class MEIC_MODULE_3 {
    constructor() {
        this.getSimplifiedSpecializationAreasClassifier = getSimplifiedSpecializationAreasClassifier ;
    }
}

let meic_module_3 = module.exports = exports = new MEIC_MODULE_3();

async function getSimplifiedSpecializationAreasClassifier  () {

    //Manual adjustments
    specClassifier.addDocument("Laboratório de Sistemas de Língua Falada - L2F (INESC-ID Lisboa)", "Language and Information Technologies");
    specClassifier.addDocument("Alberto Abad", "Language and Information Technologies");
    specClassifier.addDocument("fixed expressions", "Language and Information Technologies");
    specClassifier.addDocument("popular sayings", "Language and Information Technologies");
    specClassifier.addDocument("speech therapy", "Language and Information Technologies");
    specClassifier.addDocument("Development of a mobile application for speech therapy", "Language and Information Technologies");


    specClassifier.addDocument("Nuno Jardim Nunes", "Interaction and Visualization");
    specClassifier.addDocument("Alfredo Ferreira", "Interaction and Visualization");
    specClassifier.addDocument("João Brisson", "Interaction and Visualization");
    specClassifier.addDocument("Joaquim Jorge", "Interaction and Visualization");
    specClassifier.addDocument("Daniel Jorge Viegas Gonçalves", "Interaction and Visualization");
    specClassifier.addDocument("Hugo Miguel Aleixo Albuquerque Nicolau", "Interaction and Visualization");
    specClassifier.addDocument("Jacinto Carlos Marques Peixoto do Nascimento", "Interaction and Visualization");
    specClassifier.addDocument("Augmenting Rehabilitation", "Interaction and Visualization");
    specClassifier.addDocument("Virtual Reality", "Interaction and Visualization");
    specClassifier.addDocument("Design", "Interaction and Visualization");
    specClassifier.addDocument("Experience", "Interaction and Visualization");
    specClassifier.addDocument("Collaborative Modeling", "Interaction and Visualization");
    specClassifier.addDocument("AR on Smartphones", "Interaction and Visualization");
    specClassifier.addDocument("Flat Design", "Interaction and Visualization");
    specClassifier.addDocument("Sensing", "Interaction and Visualization");
    specClassifier.addDocument("Visualizing", "Interaction and Visualization");


    specClassifier.addDocument("network fault injection", "Cyber-Security");
    specClassifier.addDocument("Security", "Cyber-Security");
    specClassifier.addDocument("Artificial Intelligence in Security", "Cyber-Security");
    specClassifier.addDocument("REST APIs", "Cyber-Security");
    specClassifier.addDocument("Communication Contracts", "Cyber-Security");
    specClassifier.addDocument("Verification", "Cyber-Security");


    specClassifier.addDocument("Smart-Graphs", "Algorithms and Applications");
    specClassifier.addDocument("Constraint Logic", "Algorithms and Applications");


    specClassifier.addDocument("microservices architecture", "Software Engineering");
    specClassifier.addDocument("Framework", "Software Engineering");
    specClassifier.addDocument("Virtualization", "Software Engineering");
    specClassifier.addDocument("Dynamic API Invocation", "Software Engineering");
    specClassifier.addDocument("monolithic architecture", "Software Engineering");
    specClassifier.addDocument("António Paulo Teles de Menezes Correia Leitão", "Software Engineering");
    specClassifier.addDocument("António Rito Silva", "Software Engineering");
    specClassifier.addDocument("Responsive Web Applications", "Software Engineering");
    specClassifier.addDocument("Service Virtualization Framework", "Software Engineering");
    specClassifier.addDocument("Mobile Application", "Software Engineering");
    specClassifier.addDocument("Mobile", "Software Engineering");
    specClassifier.addDocument("App", "Software Engineering");


    specClassifier.addDocument("NPC", "Games");
    specClassifier.addDocument("Digital Games", "Games");
    specClassifier.addDocument("Digital Games", "Games");
    specClassifier.addDocument("Digital Games", "Games");
    specClassifier.addDocument("Digital Games", "Games");
    specClassifier.addDocument("Digital Games", "Games");
    specClassifier.addDocument("Games", "Games");
    specClassifier.addDocument("Game", "Games");
    specClassifier.addDocument("tactically", "Games");
    specClassifier.addDocument("João Miguel De Sousa de Assis Dias", "Games");
    specClassifier.addDocument("Carlos António Roque Martinho", "Games");
    specClassifier.addDocument("Rui Filipe Fernandes Prada", "Games");


    specClassifier.addDocument("Architecture", "Enterprise and Information Systems");
    specClassifier.addDocument("Support Services for Digital Operations Transformation", "Enterprise and Information Systems");
    specClassifier.addDocument("Digital Transformation", "Enterprise and Information Systems");
    specClassifier.addDocument("IT Project Management", "Enterprise and Information Systems");
    specClassifier.addDocument("Enterprise Architecture", "Enterprise and Information Systems");
    specClassifier.addDocument("Business Architecture", "Enterprise and Information Systems");
    specClassifier.addDocument("COBIT", "Enterprise and Information Systems");
    specClassifier.addDocument("Modeling", "Enterprise and Information Systems");
    specClassifier.addDocument("Archimate", "Enterprise and Information Systems");
    specClassifier.addDocument("Startup", "Enterprise and Information Systems");
    specClassifier.addDocument("Business processes", "Enterprise and Information Systems");
    specClassifier.addDocument("Sérgio Luís Proença Duarte Guerreiro", "Enterprise and Information Systems");


    specClassifier.addDocument("robots", "Intelligent Systems");
    specClassifier.addDocument("behavior for robots", "Intelligent Systems");
    specClassifier.addDocument("Change Detection on Frequent Patterns", "Intelligent Systems");
    specClassifier.addDocument("Matching", "Intelligent Systems");
    specClassifier.addDocument("Matching", "Intelligent Systems");


    specClassifier.addDocument("Urban transport", "Distributed and Cyberphysical Systems");
    specClassifier.addDocument("IoT", "Distributed and Cyberphysical Systems");
    specClassifier.addDocument("Domotic", "Distributed and Cyberphysical Systems");
    specClassifier.addDocument("Internet-of-Things", "Distributed and Cyberphysical Systems");
    specClassifier.addDocument("Framework", "Distributed and Cyberphysical Systems");
    specClassifier.addDocument("Rui Policarpo Duarte", "Distributed and Cyberphysical Systems");
    specClassifier.addDocument("Horácio Neto", "Distributed and Cyberphysical Systems");
    specClassifier.addDocument("OpenCL", "Distributed and Cyberphysical Systems");
    specClassifier.addDocument("processor", "Distributed and Cyberphysical Systems");
    specClassifier.addDocument("P3", "Distributed and Cyberphysical Systems");

    specClassifier.train();
    return specClassifier;

}