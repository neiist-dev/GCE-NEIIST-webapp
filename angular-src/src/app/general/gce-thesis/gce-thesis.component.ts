import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
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
    numberTheses: number = 0;
    numberFreeTheses: number = 0;
    recommendedTheses: any[];
    showRecomendations: boolean;
    specializationBool = false;
    it = false;
    isProfessor = false;
    course: string = '';
    areas: string[] = [];
    areaAdvanced: { [area: string]: string[]}= {};
    gce_thesis_available: boolean;
    loading = true;

    specializationAreas: string[] = [
        'Network Services and Applications',
    'Embedded Systems and Computer Architectures',
    'Distributed Systems and Operating Systems',
    'Artificial Intelligence Technologies',
    'Intelligent Systems',
    'Interaction and Multimedia',
    'Graphical Visualization',
    'Algorithms and Applications',
    'Software Engineering',
    'Programming',
    'Architecture and Management of Information Systems',
    'Information Systems Technologies']

    specializationAreasAdvanced:{[area:string]:string[]}={
        'Network Services and Applications':['#34B3E4','NSA'],
        'Embedded Systems and Computer Architectures': ['#A589D9','ESCA'],
        'Distributed Systems and Operating Systems': ['#F16D64','DSOS'],
        'Artificial Intelligence Technologies': ['#F59640','AIT'],
        'Intelligent Systems': ['#35BEC1','IS'],
        'Interaction and Multimedia': ['#F3C746','IM'],
        'Graphical Visualization': ['#F371AF','GV'],
        'Algorithms and Applications': ['#95C753','AA'],
        'Software Engineering': ['#A0A3A6','SE'],
        'Programming': ['#F9A602','P'],
        'Architecture and Management of Information Systems': ['#C21807','AMIS'],
        'Information Systems Technologies': ['#FF0266','IST']
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


    constructor(private studentService: StudentService,
                private thesisService: ThesisService,
                private modalService: NgbModal,


    ) {
    }

    @ViewChild('proposalTable') proposalTable;
    ngOnInit() {
        this.loadUser();
        if (this.gce_thesis_available) {
            this.getAreas();
            this.getThesesByArea();
            this.getRecommendedTheses();
            this.thesisService.currentTheses.subscribe(availableTheses => this.availableTheses = availableTheses);
            this.thesisService.currentIds.subscribe(ids => this.idsBot = ids);
        }


    }

    ngOnDestroy() {
        this.thesisService.changeIdsBot([]);
    }
    public changeAreas(){
        this.specializationBool = !this.specializationBool;
        this.selectedAreas = [];
    }
    public alertModal(alertContent){
        console.log("clicked");
        this.modalService.open(alertContent);

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
        this.isProfessor = this.user['roles'].includes("TEACHER");
        if (this.isProfessor){
            if (this.user['teacherDepartment'] === 'DEI'){
                this.course = "Engenharia Informática e de Computadores";
            }
        } else {
            this.course = this.loadFirstSupportedCourse(this.user['courses']);
        }
        this.it = this.course.includes("Engenharia Informática e de Computadores") || this.isProfessor;
        //this.it = this.course.includes("Engenharia Informática e de Computadores");
    }

    loadFirstSupportedCourse(courses){
         for (const c in courses){
            if (this.thesisService.isThesisAvailable(courses[c])) {
                this.gce_thesis_available=true;
                return courses[c];
            }
        }
        this.gce_thesis_available=false;
        return courses[0];
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
    getThesesByArea() {
        this.theses = [];
        this.thesisService.getThesesByArea().subscribe(res => {
            this.theses = res.response_data.theses;
            this.numberTheses = res.response_data.number;
            this.loading = false;
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

    public revertFilter(){
        this.idsBot = [] ;

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