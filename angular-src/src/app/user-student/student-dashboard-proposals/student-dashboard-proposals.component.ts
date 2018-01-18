import { Component, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatchmakingService } from '../../services/matchmaking.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { StudentService } from '../../services/student.service';
import {CompanyService} from '../../services/company.service';
//ngx
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { TemplateRef } from '@angular/core';
import {PopoverDirective} from "ngx-bootstrap";


@Component({
  selector: 'app-student-dashboard-proposals',
  templateUrl: './student-dashboard-proposals.component.html',
  styleUrls: ['./student-dashboard-proposals.component.css']
})
export class StudentDashboardProposalsComponent implements OnInit {

  user: object;
  proposals: any[];
  applications: object[];
  companyNames: any;

  //Apply
  proposal: string;
  resume: string;
  motivationLetter: string;
  companyName: string;
  applicationToDelete: string;
  toDelete: object;

  //Ng stuff
  closeResult: string;
  public modalRef: BsModalRef;

  constructor(private validateService: ValidateService,
              private authService: AuthService, private router: Router,
              private flashMessage: FlashMessagesService,
              private studentService: StudentService,
              private companyService: CompanyService,
              private modalService: BsModalService,
              private matchmakingService: MatchmakingService) {
  }



  @ViewChild('pop') pop: PopoverDirective;
  @ViewChild('proposalTable') proposalTable;


  ngOnInit() {
    this.loadUser();
    this.getAllProposals();
    this.getMyApplications();


  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  loadUser() {
    this.user = this.authService.loadUserProfile();
  }

  getAllProposals() {
    this.companyService.getAllCompanyAllProposals().subscribe(res => {
      this.proposals = res.response_data;
      this.setProposalIndex("Proposal");
    });
  }

  getMyApplications() {
    this.studentService.getStudentApplications().subscribe(res => {
      this.applications = res.response_data;
    });
  }

  setProposalIndex(prefix) {
    for (let i in this.proposals) {
      this.proposals[i].proposalIndex = prefix + "_" + (+i + 1);
    }
  }

  setProposal(id, companyName) {
    this.proposal = id;
    this.companyName = companyName;
  }

  invalidateApplication(event) {
    event.path[4].remove();
    const applicationToDelete = {id: ""};
    applicationToDelete.id = this.applicationToDelete;
    this.matchmakingService.invalidateApplication(applicationToDelete).subscribe(res => {
      if (res.succeeded) {
        this.flashMessage.show(res.message, {cssClass: 'alert-success', timeout: 1000});
      } else {
        this.flashMessage.show(res.message, {cssClass: 'alert-danger  ', timeout: 1000});
      }
    });

  }

  hide() {
    this.pop.hide();
  }

  setToDeleteApplication(appID) {
    this.applicationToDelete = appID;
  }

  updateResume(event) {
    // Assert PDF

  }

  updateMotivationLetter(event) {

  }

  applyToProposal(event) {
    this.modalRef.hide();
    const proposal = this.proposal;
    const resume = "R";
    const motivationLetter = "ML";
    const application = {
      proposal: proposal,
      company: this.companyName,
      curriculumVitae: resume,
      motivationLetter: motivationLetter
    };

    this.studentService.applyToProposal(application).subscribe(data => {
      if (data.succeeded) {
        this.flashMessage.show('Aplicação submetida com sucesso', {cssClass: 'alert-success', timeout: 1000});

      } else {
        this.flashMessage.show('Aplicação não submetida', {cssClass: 'alert-danger', timeout: 1000});
      }
    });

  }
  /*
    addRow() {
      this.proposalTable.push({
        make: this.application.proposal,
        model: this.application.creationDate,
        pole: this.application.status
      });
    }
    */
}
