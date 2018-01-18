const AccessStudent = require('../mongodb/accesses/access-student');
const AccessThesis = require('../mongodb/accesses/access-thesis');

class MatchmakingServices {
    constructor() {
        this.suggestThesisStudent = suggestThesisStudent;
    }
}

let match_making_services = module.exports = exports = new MatchmakingServices();

// Functions
function suggestThesisStudent(student, callback){

    AccessStudent.getAreasOfInterest(student, function (areasCountStudent) {
        let studentAreasOfInterest = []
        for (var key in areasCountStudent) {
            if (areasCountStudent[key] > 0)
                studentAreasOfInterest.push(key);
        }
        AccessThesis.getThesisByArea(studentAreasOfInterest, function (allThesis) {
            let thesisForStudent = [];
            for (var id in allThesis) {
                let thesis = allThesis[id];
                let thesisAreasOfInterest = thesis.area;

                let score = 0 ;
                for (var i in studentAreasOfInterest)
                    if (thesisAreasOfInterest.includes(studentAreasOfInterest[i]))
                        score = score + areasCountStudent[studentAreasOfInterest[i];

                thesisForStudent.push([id, count]);
            }
            callback(thesisForStudent.sort(function(a, b) {
                return a[2] > b[2] ? 1 : -1;
            }));

        });
    });



}


