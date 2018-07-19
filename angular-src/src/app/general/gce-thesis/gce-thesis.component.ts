import { Component, OnInit, ViewChild} from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { StudentService } from '../../services/student.service';
import { ThesisService } from '../../services/thesis.service';
import {CompanyService} from '../../services/company.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { TemplateRef } from '@angular/core';
import {PopoverDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-gce-thesis',
  templateUrl: './gce-thesis.component.html',
  styleUrls: ['./gce-thesis.component.css']
})
export class GceThesisComponent implements OnInit {
    user: object;
    proposals: any[];
    applications: object[];
    theses: object[];
    numberTheses: number;
    recommendedTheses: object[];
    showRecomendations: boolean;
    //Apply
    proposal: string;
    motivationLetter: string;
    companyName: string;
    applicationToDelete: string;

    //Ng stuff
    closeResult: string;
    public modalRef: BsModalRef;
    constructor(private flashMessage: FlashMessagesService,
                private studentService: StudentService,
                private thesisService: ThesisService,
                private modalService: BsModalService,
               ) {
    }

    @ViewChild('pop') pop: PopoverDirective;
    @ViewChild('proposalTable') proposalTable;
    ngOnInit() {
        this.loadUser();
        this.getTheses();
        this.getRecommendedTheses();


    }

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
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