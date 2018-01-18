import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {InfoComponent} from '../../general/info/info.component';
import {CompanyService} from '../../services/company.service';
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


  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router,
              private companyService: CompanyService) {
  }

  ngOnInit() {
    this.company = this.authService.loadUserProfile();
    const companyName = this.company.name;
  }
}
