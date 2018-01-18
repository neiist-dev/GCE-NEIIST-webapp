import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../services/auth.service';
import {CompanyService} from '../../services/company.service';

@Component({
  selector: 'app-company-proposals',
  templateUrl: './company-proposals.component.html',
  styleUrls: ['./company-proposals.component.css']
})
export class CompanyProposalsComponent implements OnInit {

  company: any;
  proposals: object[];

  constructor(private authService: AuthService, private companyService: CompanyService) { }

  ngOnInit() {
    this.company = this.authService.loadUserProfile();

    this.companyService.getAllCompanyAllProposals().subscribe( proposals => { this.proposals = proposals.response_data; });
  }

}
