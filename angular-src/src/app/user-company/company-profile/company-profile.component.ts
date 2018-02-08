import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../services/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit { user: object;
  company: object;

  constructor(private companyService: CompanyService
  ) {

  }


  ngOnInit() {
    //TODO: This can be the student's profile component
    this.loadUser();
  }

  loadUser() {
    this.company = this.companyService.loadCompanyProfile();

  }
}
