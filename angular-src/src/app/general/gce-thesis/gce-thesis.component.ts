import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { StudentService } from '../../services/student.service';
import { ThesisService } from '../../services/thesis.service';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';





@Component({
    selector: 'app-gce-thesis',
    templateUrl: './gce-thesis.component.html',
    styleUrls: ['./gce-thesis.component.css']
})
export class GceThesisComponent implements OnInit, OnDestroy {
    user: object;
    applications: any[];
    theses: any[];
    numberTheses: number;
    numberFreeTheses: number = 0;
    recommendedTheses: any[];
    showRecomendations: boolean;
    specializationBool = false;
    it = false;
    course: string = '';
    areas: string[] = [];
    areaAdvanced: { [area: string]: string[]}= {};

    specializationAreas: string[] = [
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

    specializationAreasAdvanced:{[area:string]:string[]}={
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

    queryString: string;
    selectedAreas: string[] = [];
    types: string[] = ["Project","Dissertation"];
    selectedTypes: string[] = ["Project","Dissertation"];
    proposal: string;
    motivationLetter: string;
    idsBot: number[];

    availableTheses: number;
    //Ng stuff


    constructor(private flashMessage: FlashMessagesService,
                private studentService: StudentService,
                private thesisService: ThesisService,
                private modalService: NgbModal,


    ) {
    }

    @ViewChild('proposalTable') proposalTable;
    ngOnInit() {
        this.loadUser();
        this.getAreas();
        this.getTheses();
        this.getRecommendedTheses();
        this.thesisService.currentTheses.subscribe(availableTheses => this.availableTheses = availableTheses);
        this.thesisService.currentIds.subscribe(ids => this.idsBot = ids);

    }

    ngOnDestroy() {
        this.thesisService.changeIdsBot([]);
    }
    public changeAreas(){
        this.specializationBool = !this.specializationBool;
        this.selectedAreas = [];
    }
    public openModal(content,thesis) {



        this.modalService.open(content);
        this.thesisService.incrementClicks(thesis.id);

        document.getElementById("thesis-title").textContent = thesis.title;

        if (thesis.objectives.length > 0){
            document.getElementById("thesis-objectives").innerHTML = '<h5>Objectives: </h5> <p style="word-wrap: break-word;">'+thesis.objectives+'</p>';
        }

        if (thesis.requirements.length > 0){
            document.getElementById("thesis-requirements").innerHTML = '<h5>Requirements: </h5> <p style="word-wrap: break-word;">'+thesis.requirements+'</p>';
        }

        if (thesis.observations.length > 0){
            document.getElementById("thesis-observations").innerHTML = '<h5>Observations: </h5> <p style="word-wrap: break-word;">'+thesis.observations+'</p>';
        }

        if(thesis.supervisors.length > 0) {
            var supervisorText = '<h5> Supervisors: </h5>';
            for (const supervisor in thesis.supervisors) {
                supervisorText += '<p>' + thesis.supervisors[supervisor] + '</p>';
            }
            document.getElementById("thesis-supervisors").innerHTML = supervisorText;
        }

        if (thesis.vacancies != null){


            document.getElementById("thesis-applicants").innerHTML = '<button type="button" class="btn btn-primary">Applicants <span class="badge">'+thesis.vacancies+'</span></button>';
        }
        if (thesis.location.length > 0){
            document.getElementById("thesis-id").innerHTML = '<h6 style="display: inline">ID: </h6>  <p style="display: inline" class="footer-p">'+thesis.id+'</p>';

        }
        if (thesis.location.length > 0){
            document.getElementById("thesis-location").innerHTML = '<h6 style="display: inline">Location: </h6>  <p style="display: inline" class="footer-p">'+thesis.location+'</p>';
        }
    }



    loadUser() {
        this.user = this.studentService.loadStudentProfile();
        this.course = this.user['courses'][0];
        this.it = this.course.includes("Engenharia Informática e de Computadores");
    }


    getAreas(){
        
        this.areaAdvanced = this.thesisService.getAreasFromDump(this.course);
       
        this.areas = []

        for (let key in this.areaAdvanced){
            this.areas.push(key);
        }
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
            for (let thesis of this.theses) {
                if (thesis.status == "Não atribuída")  {
                    this.numberFreeTheses++;
                }
            }
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
            this.selectedAreas.push(clickedArea);
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
            this.selectedTypes.push(clickedType);
            this.selectedTypes = this.selectedTypes.filter(str =>str);
        }

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

    public incrementClicks() {
        this.clicks += 1;
    }
}