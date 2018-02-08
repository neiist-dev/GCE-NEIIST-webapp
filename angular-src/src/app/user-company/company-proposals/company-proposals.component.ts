import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../services/company.service';

@Component({
  selector: 'app-company-proposals',
  templateUrl: './company-proposals.component.html',
  styleUrls: ['./company-proposals.component.css']
})
export class CompanyProposalsComponent implements OnInit {

  company: any;
  proposals: object[];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.company = this.companyService.loadCompanyProfile();

    this.companyService.getAllCompanyAllProposals().subscribe( proposals => { this.proposals = proposals.response_data; });
  }

}
