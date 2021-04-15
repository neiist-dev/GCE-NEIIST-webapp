
import { Injectable } from '@angular/core';


@Injectable()
export class AreasDump{


    abbreviation: {[abb: string]: string } = {
        'MEIC-A' : 'Engenharia Informática e de Computadores',
        'MEIC-T' : 'Engenharia Informática e de Computadores',
        'MEMec' : 'Engenharia Mecânica',
        'MEBiom' : 'Engenharia Biomédica',
        'MEQ' : 'Engenharia Química',
        'MEAer' : 'Engenharia Aeroespacial',
        'MEFT' : 'Engenharia Física Tecnológica',
    };
    availableCourses: string[] = ['Engenharia Informática e de Computadores',
                                  'Engenharia Mecânica',
                                  'Engenharia Biomédica',
                                  'Engenharia Aeroespacial',
                                  'Engenharia Química',
                                  'Engenharia Física Tecnológica' ];

    areas: {[course: string]: {[area: string]: string[]}} = {
        'Engenharia Informática e de Computadores' : {
            "Software Engineering":["#34B3E4","SE"],
            "Enterprise and Information Systems": ["#A589D9","EIS"],
            "Distributed and Cyberphysical Systems": ["#F16D64","DCS"],
            "Interaction and Visualization": ["#F59640","IV"],
            "Intelligent Systems": ["#35BEC1","IS"],
            "Algorithms and Applications": ["#F3C746","AA"],
            "Cyber-Security": ["#F371AF","CS"],
            "Games": ["#95C753","G"],
            "Bioinformatics and Computational Biology": ["#A0A3A6","BCB"],
            "Language and Information Technologies": ["purple","LIT"]

                                                    },
        'Engenharia Mecânica' : {
                                        'Energy': ['#34B3E4', 'ENER'],
                                        'Production': ['#A589D9', 'PROD'],
                                        'Systems': ['#F16D64', 'SYS']
                                      },
        'Engenharia Biomédica' : {},

        'Engenharia Aeroespacial' : {},

        'Engenharia Química' : {},

        'Engenharia Física Tecnológica': {}

    };

    public getAreas(course) {
        for (const c in this.availableCourses){
            if (course.includes(this.availableCourses[c])) {
                course = this.availableCourses[c];
            }
        }
        return this.areas[course];
    }

    public isThesisAvailable(course: string){
        for (const c in this.availableCourses){
            if (course.includes(this.availableCourses[c])) {
                return true;
            }
        }
        return false;
    }
}
