import { Injectable } from "@angular/core";


@Injectable()
export class AreasDump{

    availableCourses: string[] = ["Engenharia Informática e de Computadores","Engenharia Mecânica"]

    areas: {[course: string] : {[area:string]:string[]}} = {
        "Engenharia Informática e de Computadores" : {
                                                        "Network Services and Applications":["#34B3E4","NSA"],
                                                        "Embedded Systems and Computer Architectures": ["#A589D9","ESCA"],
                                                        "Distributed Systems and Operating Systems": ["#F16D64","DSOS"],
                                                        "Artificial Intelligence Technologies": ["#F59640","AIT"],
                                                        "Intelligent Systems": ["#35BEC1","IS"],
                                                        "Interaction and Multimedia": ["#F3C746","IM"],
                                                        "Graphical Visualization": ["#F371AF","GV"],
                                                        "Algorithms and Applications": ["#95C753","AA"],
                                                        "Software Engineering": ["#A0A3A6","SE"],
                                                        "Programming": ["#F9A602","P"],
                                                        "Architecture and Management of Information Systems": ["#C21807","AMIS"],
                                                        "Information Systems Technologies": ["#FF0266","IST"]
                                                    },
        "Engenharia Mecânica" : {
                                        "Energy":["#34B3E4","ENER"],
                                        "Production": ["#A589D9","PROD"],
                                        "Systems": ["#F16D64","SYS"]
                                      } 
    }

    public getAreas(course){
        for (let c in this.availableCourses){
            if(course.includes(this.availableCourses[c])){
              
                course = this.availableCourses[c];
            }
        }

        return this.areas[course];
    }
}