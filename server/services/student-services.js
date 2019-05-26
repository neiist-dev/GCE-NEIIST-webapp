const DBAccess = require('../mongodb/accesses/mongo-access');

class StudentServices {
    constructor() {
        this.parseStudentData = parseStudentData;
        this.getAreasOfInterest = getAreasOfInterest;
        this.getMainRole = getMainRole;

    }
}

let student_services = module.exports = exports = new StudentServices();

// Functions



function parseStudentData(person, callback) {
    let parsedStudent = {};
    const student = person[0];
    const enrolments = person[1];

    parsedStudent.name = student.name;
    parsedStudent.username = student.username;
    parsedStudent.gender = student.gender;
    parsedStudent.email = student.email;
    parsedStudent.campus = student.campus;
    parsedStudent.enrolments = ["placeholder"];
    parsedStudent.roles = [];

    // Check if is a student
    let studentRole = null;
    for (let role of student.roles) {
        parsedStudent.roles.push(role.type)
        if (role.type === 'STUDENT') {
            studentRole = role;
        }
    }

    if(studentRole) {
        parsedStudent.courses = [];
        for (let registration of studentRole.registrations) {
            parsedStudent.courses.push(registration.name);
        }

        for (let enrolment of enrolments.enrolments)   {
            parsedStudent.enrolments.push(enrolment.name);
        }
    }


    callback(null, parsedStudent);
}

function getMainRole (roles)    {
    if (roles.includes('STUDENT'))  {
        return 'STUDENT';
    } else if (roles.includes('TEACHER') && roles.includes('ALUMNI'))   {
        return 'TEACHER';
    } else if (roles.includes('ALUMNI'))    {
        return 'ALUMNI';
    }   else    {
        throw new Error ('Unrecognized role in getMainRole');
    }
}

function getAreasOfInterest(courses, numberOfAreas) {
    const SoftwareEngineering = new Set(["Arquitecturas de Software", "Especificação de Software","Programação Avançada",
        "Teste e Validação de Software"]);
    const EnterpriseInformationSystems = new Set(["Gestão de Projectos Informáticos",
        "Engenharia e Tecnologia de Processos de Negócio",
        "Fundamentos de Sistemas de Informação","Arquitetura Empresarial","Gestão de Sistemas de Informação",
        "Administração e Gestão de Infraestruturas de It", "Engenharia de Sistemas de Larga Escala",
        "Administração de Dados e Sistemas de Informação"]);
    const DistributedCyberSystems = new Set(["Desenvolvimento de Aplicações Distribuídas",
        "Design de Interação para a Internet das Coisas",
        "Aplicações e Computação para a Internet das Coisas", "Computação Móvel e Ubíqua",
        "Computação Paralela e Distribuída", "Ambientes Inteligentes",
        "Sistemas de Elevada Confiabilidade", "Computação em Nuvem e Virtualização",
        ""]);
    const InteractionViz = new Set(["Animação e Visualização Tridimensional", "Conceção Centrada no Utilizador",
        "Visualização de Informação", "Comunicação Visual Interactiva", "Produção de Conteúdos Multimédia",
        "Programação 3D"]);
    const IntelligentSystems = new Set(["Procura e Planeamento", "Agentes Autónomos e Sistemas Multi-Agente",
        "Planeamento, Aprendizagem e Decisão Inteligente", "Representação do Conhecimento e Raciocínio",
        "Processamento de Imagem e Visão", "Robôs Sociais e Interação Pessoa Robô", "Aprendizagem",
        "Introdução à Robótica", "Sistemas Robóticos em Manipulação", "Ciência de Dados"]);
    const AlgoritmsApplications = new Set (["Algoritmos para Lógica Computacional", "Computabilidade e Complexidade",
        "Ciência das Redes Complexas", "Algoritmos Avançados", "Linguagens de Programação"]);
    const Security = new Set (["Ciber Segurança Forense", "Segurança em Software", "Segurança Informática em Redes e Sistemas",
        "Criptografia e Protocolos de Segurança"]);
    const Games = new Set(["Computação Gráfica para Jogos", "Design de Jogos", "Inteligência Artificial para Jogos",
        "Metodologia de Desenvolvimento de Jogos", ""]);
    const BioInf = new Set(["Bioinformática", "Tecnologias de Informação em Saúde"]);
    const LanguageTech = new Set(["Língua Natural", "Processamento e Recuperação de Informação",
        "Processamento da Fala"]);

    let coursesSet = [SoftwareEngineering, EnterpriseInformationSystems, DistributedCyberSystems, InteractionViz,
        IntelligentSystems, AlgoritmsApplications, Security, Games, BioInf, LanguageTech];

    let counter = new Array(10).fill(0);

    courses.forEach( (course) =>  {
        for (let i = 0; i < coursesSet.length; i++)
            if (coursesSet[i].has(course))  {
                counter[i] += 1;
                break;
            }
    });

    let mostLikelyArea = arrayMax(counter);
    let numberOfCoursesFirstArea = mostLikelyArea.max;

    //Get second most voted area
    if (numberOfAreas == 2) {
        counter[mostLikelyArea.index] = 0;
        var secondMostLikelyArea = arrayMax(counter);
        var numberOfCoursesSecondArea = secondMostLikelyArea.max;
    }

    result = [];


    //There are courses from one area
    if (numberOfCoursesFirstArea > 0)  {
        let mostLikelyAreaName = getAreaFromIndex(mostLikelyArea.index);
        result.push(mostLikelyAreaName);

        //There are also courses from another area
        if (numberOfAreas == 2 && numberOfCoursesSecondArea > 0)  {
            let secondMostLikelyAreaName = getAreaFromIndex(secondMostLikelyArea.index);
            result.push(secondMostLikelyAreaName);
            return result;
        }

    }

    return result;


}

function arrayMax(arr) {
    let len = arr.length, max = 0;
    while (len--) {
        if (arr[len] > max) {
            max = arr[len];
            var index = len;
        }
    }
    let result =  {
        max: max,
        index: index
    };
    return result;
}


function getAreaFromIndex(index)  {
    switch (index)  {
        case 0:
            return "Software Engineering";
        case 1:
            return "Enterprise and Information Systems";
        case 2:
            return "Distributed and Cyberphysical Systems";
        case 3:
            return "Interaction and Visualization";
        case 4:
            return "Intelligent Systems";
        case 5:
            return "Algorithms and Applications";
        case 6:
            return "Cyber-Security";
        case 7:
            return "Games";
        case 8:
            return "Bioinformatics and Computational Biology";
        case 9:
            return "Language and Information Technologies";
    }
}
