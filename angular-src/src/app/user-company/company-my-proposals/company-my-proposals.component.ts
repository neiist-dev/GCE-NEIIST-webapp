import {Component, OnInit, TemplateRef} from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidateService} from '../../services/validate.service';
import {CompanyService} from '../../services/company.service';
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-company-my-proposals',
  templateUrl: './company-my-proposals.component.html',
  styleUrls: ['./company-my-proposals.component.css']
})

export class CompanyMyProposalsComponent implements OnInit {
  company: any;
  proposals: any[];
  proposal: any;
  [key: string]: any;
  modalRef: any;

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private companyService: CompanyService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.company = this.authService.loadUserProfile();
    const companyName = this.company.name;
    this.companyService.getAllCompanyProposals().subscribe( proposals => {
      this.proposals = proposals.response_data;
      this.setProposalByName(companyName);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  setProposal(proposal) {
    this.proposal = proposal;
  }

  setProposalByName(name) {
    for (let i in this.proposals) {
      this.proposals[i].proposalIndex = name + '_' + (+i + 1);
    }
  }

  refresh() {
    window.location.reload();
  }

  updateProposal() {
    // Check if all fields are filled
    if (!this.validateService.validateFieldsProposal(this.proposal))  {
      this.flashMessage.show('Por favor, preencha todos os campos', {cssClass: 'alert-danger', timeout: 1000});
      return false;
    }

    if (!this.validateService.validateDates(this.proposal))  {
      this.flashMessage.show('Por favor introduza datas válidas', {cssClass: 'alert-danger', timeout: 1000});
      return false;
    }

    this.companyService.updateProposal(this.proposal).subscribe(data => {
      if (data.succeeded) {
        this.flashMessage.show('Proposta editada com sucesso', {cssClass: 'alert-success', timeout: 1000});
      } else {
        this.flashMessage.show('Proposta não editada', {cssClass: 'alert-danger', timeout: 1000});
      }
    });
  }
}
