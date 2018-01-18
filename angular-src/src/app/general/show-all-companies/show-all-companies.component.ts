import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {CompanyService} from '../../services/company.service';

@NgModule({
  declarations: [],
  exports: [ShowAllCompaniesComponent]
})

@Component({
  selector: 'app-show-all-companies',
  templateUrl: './show-all-companies.component.html',
  styleUrls: ['./show-all-companies.component.css']
})
export class ShowAllCompaniesComponent implements OnInit {

  companies: object[];

  constructor(private authService: AuthService,
              private companyService: CompanyService) { }

  ngOnInit() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companies = [];
    this.companyService.getCompanyNames().subscribe(res => {
      this.companies = res.response_data;
    });

  }


}
