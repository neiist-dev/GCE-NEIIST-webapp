import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {ShowAllProposalsComponent} from '../show-all-proposals/show-all-proposals.component';
import {ShowAllCompaniesComponent} from '../show-all-companies/show-all-companies.component';
import {AuthService} from '../../services/auth.service';
import {CompanyService} from '../../services/company.service';
import {StudentService} from '../../services/student.service';

@NgModule({
  declarations: [ShowAllProposalsComponent,ShowAllCompaniesComponent],
  imports: [ShowAllProposalsComponent,ShowAllCompaniesComponent],
  exports: [InfoComponent]
})

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  numberOfProposals: number;
  numberOfCompanies: number;
  numberOfStudents: number;

  constructor(private authService: AuthService,
              private companyService: CompanyService,
              private studentService: StudentService) { }

  ngOnInit() {
    this.getNumberOfProposals();
    this.getNumberOfCompanies();
    this.getNumberOfStudents();
    this.getNumberOfStudentsPerCourse();
  }

  getNumberOfProposals()  {
    this.companyService.getTotalNumberOfProposals().subscribe(res => {
      this.numberOfProposals = res.response_data;
    });
  }

  getNumberOfCompanies()  {
    this.companyService.getTotalNumberOfCompanies().subscribe(res => {
      this.numberOfCompanies = res.response_data;
    });
  }
  getNumberOfStudents()  {
    this.studentService.getTotalNumberOfRegisteredStudents().subscribe(res => {
      this.numberOfStudents = res.response_data;
    });
  }
  getNumberOfStudentsPerCourse() {
    this.studentService.getTotalNumberOfRegisteredStudentsPerCourse().subscribe(res => {
        console.log(res.response_data); // FIXME
    });
  }

}
