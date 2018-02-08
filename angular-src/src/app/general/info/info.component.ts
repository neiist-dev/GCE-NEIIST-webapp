import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {ShowAllProposalsComponent} from '../show-all-proposals/show-all-proposals.component';
import {ShowAllCompaniesComponent} from '../show-all-companies/show-all-companies.component';
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

  constructor(private companyService: CompanyService,
              private studentService: StudentService) { }

  ngOnInit() {
      this.getNumberOfProposals();
      this.getNumberOfCompanies();
      this.getNumberOfStudents();
      this.getNumberOfStudentsPerCourse();
  }

    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [];
    public doughnutChartType:string = 'pie';
    public colors:any[] = [{backgroundColor: ["#008CC9", "#7C5BBB", "#EC640C", "#DD2E1F", "#009EA5", "#E6A700",
                                            "#E2247F", "#60AA14", "#737679", "#004471", "#303336",
                                            "#295A10", "#295A10", "#452B7F", "#870044", "#88001A",
                                            "#8B6700", "#903000", "#005C69", "#005E93", "#AA7D00"]}];

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
        let course;
        let parsedData = res.response_data;

        for (course in parsedData)  {
            this.doughnutChartLabels.push(course);
        }
        let courses = this.doughnutChartLabels;

        let toAdd;
        for (let i = 0; i < courses.length; i++) {
            let a = JSON.stringify(courses[i]);

            //Bracket notation
            toAdd = eval("parsedData[" + a + "]");

            /**
             * For Angular to recognize the change in the dataset
             * it has to change the dataset variable directly,
             * so one way around it, is to clone the data, change it and then
             * assign it;
             */

            let clone = JSON.parse(JSON.stringify(this.doughnutChartData));
            clone.push(toAdd);
            this.doughnutChartData = clone;
        }

    });
  }

}
