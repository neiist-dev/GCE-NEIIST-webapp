import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {InfoComponent} from '../../general/info/info.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [InfoComponent]
})

@Component({
  selector: 'app-dashboard-company',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class DashboardCompanyComponent implements OnInit {
  company: any;
  proposals: any[];
  proposal: any;
  [key: string]: any;


  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.company = this.companyService.loadCompanyProfile();
    const companyName = this.company.name;
  }
}
