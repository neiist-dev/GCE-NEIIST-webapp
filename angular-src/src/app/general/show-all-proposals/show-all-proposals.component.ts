import { Component, OnInit,TemplateRef  } from '@angular/core';
import { NgModule } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CompanyService} from '../../services/company.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsModalService } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [],
  exports: [ShowAllProposalsComponent]
})

@Component({
  selector: 'app-show-all-proposals',
  templateUrl: './show-all-proposals.component.html',
  styleUrls: ['./show-all-proposals.component.css']
})
export class ShowAllProposalsComponent implements OnInit {

  proposals: object[];
  proposal: any;
  numberOfProposals: number;
  company: any;
  modalRef: any;
  currentProposal: object;
  index: number;
  constructor(private authService: AuthService,
              private companyService: CompanyService,
              private flashMessage: FlashMessagesService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getAllProposals();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  setProposal(proposal) {
    this.proposal = proposal;
  }

  getAllProposals() {
    this.proposals = [];
    this.companyService.getAllCompanyAllProposals().subscribe(data => {
      if(data.succeeded) {
        this.proposals = data.response_data;
      } else {
        this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
      }

    });
  }

}
