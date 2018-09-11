import { Component, OnInit, ViewChild} from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { StudentService } from '../../services/student.service';
import { ThesisService } from '../../services/thesis.service';
import { TemplateRef } from '@angular/core';

@Component({
    selector: 'app-gce-thesis',
    templateUrl: './gce-thesis.component.html',
    styleUrls: ['./gce-thesis.component.css']
})
export class GceThesisComponent implements OnInit {
    user: object;
    applications: any[];
    theses: any[];
    numberTheses: number;
    recommendedTheses: any[];
    showRecomendations: boolean;
    areas: string[] = [
        "Software Engineering",
        "Enterprise and Information Systems",
        "Distributed and Cyberphysical Systems",
        "Interaction and Visualization",
        "Intelligent Systems",
        "Algorithms and Applications",
        "Cyber-Security",
        "Games",
        "Bioinformatics and Computational Biology",
        "Language and Information Technologies"]
    areaAdvanced:{[area:string]:string[]}={
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
    };
    filteredTheses: object[];
    selectedAreas: string[] = [];
    types: string[] = ["Project","Dissertation"];
    selectedTypes: string[] = ["Project","Dissertation"];
    //Apply
    proposal: string;
    motivationLetter: string;
    companyName: string;
    applicationToDelete: string;




    //Ng stuff
    closeResult: string;
    constructor(private flashMessage: FlashMessagesService,
                private studentService: StudentService,
                private thesisService: ThesisService
    ) {
    }

    @ViewChild('proposalTable') proposalTable;
    ngOnInit() {
        this.loadUser();
        this.getTheses();
        this.getRecommendedTheses();


    }

    public openModal(template: TemplateRef<any>) {
    }


    loadUser() {
        this.user = this.studentService.loadStudentProfile();
    }

    getRecommendedTheses() {
        this.recommendedTheses = [];
        this.studentService.getRecommendedTheses().subscribe(res => {
            this.recommendedTheses = res.response_data;
        });

    }
    getTheses() {
        this.theses = [];
        this.thesisService.getAllTheses().subscribe(res => {
            this.theses = res.response_data;
            this.numberTheses = this.theses.length;
        });

    }
    toggleShowRecomendations(event)   {
        console.log(event);
        this.showRecomendations = !this.showRecomendations;
    }

    addRecomendations(event)    {
        const idSet = new Set;
        this.studentService.getRecommendedTheses().subscribe(res => {
            const oldTheses = this.recommendedTheses;
            for (const oldThesis of oldTheses) {
                idSet.add(this.getId(oldThesis));
            }

            const newTheses = res.response_data;
            for (const newThesis of newTheses)   {
                if (!idSet.has(newThesis.id))  {
                    this.recommendedTheses.unshift(newThesis);
                }
            }
        });
    }

    getId(t)    {
        return t.id;
    }

    changeSelectedAreas(clickedArea){

        if(this.selectedAreas.indexOf(clickedArea)> -1) {
            this.selectedAreas = this.selectedAreas.filter(str => str != clickedArea);
        }
        else{
            this.selectedAreas.push(clickedArea)
            if (this.selectedAreas.length > 2){
                this.selectedAreas.shift();
            }
            this.selectedAreas = this.selectedAreas.filter(str => str);
        }
    }

    changeSelectedTypes(clickedType){

        if(this.selectedTypes.indexOf(clickedType)> -1 ){
            if(this.selectedTypes.length >= 2) {
                this.selectedTypes = this.selectedTypes.filter(str => str != clickedType)
            }

        }
        else{
            this.selectedTypes.push(clickedType)
            this.selectedTypes = this.selectedTypes.filter(str =>str);
        }
        console.log(this.selectedTypes)
    }
}

//Domain model
class Thesis {
    id: string;
    title: string;
    supervisors: string[];
    vacancies: number;
    location: string;
    courses: string[];
    observations: string;
    objectives: string;
    status: string;
    requirements: string;
    areas: string[];
    type: number;
    clicks: number;
    lastModified: any;

    constructor(id: string, title: string, supervisors: string[], vacancies: number, location: string,
                courses: string[], observations: string, objectives: string, status: string, requirements: string,
                areas: string[], type: number, clicks: number, lastModified: any) {
        this.id = id;
        this.title = this.title;
        this.supervisors = this.supervisors;
        this.vacancies = this.vacancies;
        this.location = this.location;
        this.courses = this.courses;
        this.observations = this.observations;
        this.objectives = this.objectives;
        this.status = this.status;
        this.requirements = this.requirements;
        this.areas = areas;
        this.type = type;
        this.clicks = this.clicks;
        this.lastModified = this.lastModified;

    }

    incrementClicks() {
        this.clicks += 1;
    }
}