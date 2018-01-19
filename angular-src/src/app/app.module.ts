import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { NavbarComponent } from './general/navbar/navbar.component';
import { LoginComponent } from './general/login/login.component';
import { HomeComponent } from './general/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent} from './general/register/register.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { StudentService } from './services/student.service';
import { CompanyService } from './services/company.service';
import { MatchmakingService } from './services/matchmaking.service';
import { CompanyRegisterComponent } from './general/register/company-register/company-register.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CompanyAddProposalComponent } from './user-company/company-add-proposal/company-add-proposal.component';
import { DashboardStudentComponent } from './user-student/student-dashboard/student-dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FeedbackService } from './services/feedback.service';
import { ShowAllProposalsComponent } from './general/show-all-proposals/show-all-proposals.component';
import { CompanyProposalsComponent } from './user-company/company-proposals/company-proposals.component';
import { DashboardCompanyComponent } from './user-company/company-dashboard/company-dashboard.component';
import { FooterComponent } from './general/footer/footer.component';
import { ModalModule } from 'ngx-bootstrap';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FileSelectDirective } from 'ng2-file-upload';
import { CompanyProfileComponent } from './user-company/company-profile/company-profile.component';
import { StudentProfileComponent } from './user-student/student-profile/student-profile.component';
import { InfoComponent } from './general/info/info.component';
import { CompanyStatsComponent } from './user-company/company-stats/company-stats.component';
import { ShowAllCompaniesComponent } from './general/show-all-companies/show-all-companies.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ProfessorDashboardComponent } from './user-professor/professor-dashboard/professor-dashboard.component';
import { ProfessorProfileComponent } from './user-professor/professor-profile/professor-profile.component';
import { LoginStudentComponent } from './general/login/login-student/login-student.component';
import { LoginProfessorComponent } from './general/login/login-professor/login-professor.component';
import {MockBackend} from '@angular/http/testing';
import { FeedbackComponent } from './general/feedback/feedback.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AgmCoreModule } from '@agm/core';
import { CompanyMyProposalsComponent } from './user-company/company-my-proposals/company-my-proposals.component';
import { ComingSoonComponent } from './general/coming-soon/coming-soon.component';
import { MaintenanceComponent } from './general/maintenance/maintenance.component';
import { StudentDashboardProposalsComponent } from './user-student/student-dashboard-proposals/student-dashboard-proposals.component';
import { WorkInProgressComponent } from './general/work-in-progress/work-in-progress.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { GAComponent } from './general/ga/ga.component';
import { PrivacyPolicyComponent } from './general/privacy-policy/privacy-policy.component';
import { TermsUsageComponent } from './general/terms-usage/terms-usage.component';
import { FaqComponent } from './general/faq/faq.component';
import { GceHashCodeComponent } from './general/gce-hash-code/gce-hash-code.component';
import { GceHashCodeNextComponent } from './general/gce-hash-code-next/gce-hash-code-next.component';
import { secrets } from  '../../.env';
import { UploadCvComponent } from './general/upload-cv/upload-cv.component';
import { FbComponent } from './general/fb/fb.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', children: [
    {path: '', component: RegisterComponent},
    {path: 'company', component: CompanyRegisterComponent}
  ]},
  {path: 'login', children: [
    {path: '', component: LoginComponent},
    {path: 'student', component: LoginStudentComponent},
    {path: 'professor', component: LoginProfessorComponent}
  ]},
  {path: 'dashboardStudent', component: DashboardStudentComponent, canActivate:[AuthGuardService]},
  {path: 'dashboardProfessor', component: ProfessorDashboardComponent, canActivate:[AuthGuardService]},
  {path: 'dashboardCompany', component: DashboardCompanyComponent, canActivate:[AuthGuardService]},
  {path: 'stats', component: CompanyStatsComponent, canActivate:[AuthGuardService]},
  {path: 'profileCompany', component: CompanyProfileComponent, canActivate:[AuthGuardService]},
  {path: 'profileStudent', component: StudentProfileComponent, canActivate:[AuthGuardService]},
  {path: 'profileProfessor', component: ProfessorProfileComponent, canActivate:[AuthGuardService]},
  {path: 'addProposals', component: CompanyAddProposalComponent, canActivate:[AuthGuardService]},
  {path: 'showAllProposals', component: ShowAllProposalsComponent},
  {path: 'showProposals', component: CompanyProposalsComponent, canActivate:[AuthGuardService]},
  {path: 'wip', component: ComingSoonComponent},
  {path: 'terms-of-use', component: TermsUsageComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'hashcode', component: GceHashCodeComponent,canActivate:[AuthGuardService]},
  {path: 'next-steps', component: GceHashCodeNextComponent,canActivate:[AuthGuardService]}

  ];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardStudentComponent,
    RegisterComponent,
    CompanyRegisterComponent,
    CompanyAddProposalComponent,
    ShowAllProposalsComponent,
    CompanyProposalsComponent,
    DashboardCompanyComponent,
    FooterComponent,
    FileSelectDirective,
    CompanyProfileComponent,
    StudentProfileComponent,
    InfoComponent,
    CompanyStatsComponent,
    ShowAllCompaniesComponent,
    ProfessorDashboardComponent,
    ProfessorProfileComponent,
    LoginStudentComponent,
    LoginProfessorComponent,
    FeedbackComponent,
    CompanyMyProposalsComponent,
    ComingSoonComponent,
    MaintenanceComponent,
    StudentDashboardProposalsComponent,
    WorkInProgressComponent,
    GAComponent,
    PrivacyPolicyComponent,
    TermsUsageComponent,
    FaqComponent,
    GceHashCodeComponent,
    GceHashCodeNextComponent,
    UploadCvComponent,
    FbComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: secrets.GOOGLE_MAPS,
    }),
    FlashMessagesModule,
  ],
  providers: [
    ValidateService,
    AuthService,
    StudentService,
    AuthGuardService,
    CompanyService,
    MatchmakingService,
    MockBackend,
    FeedbackService,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
