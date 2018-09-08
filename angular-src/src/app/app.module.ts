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
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { StudentService } from './services/student.service';
import { ThesisService } from './services/thesis.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { DashboardStudentComponent } from './user-student/student-dashboard/student-dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FeedbackService } from './services/feedback.service';
import { FooterComponent } from './general/footer/footer.component';
import { ModalModule } from 'ngx-bootstrap';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FileSelectDirective } from 'ng2-file-upload';
import { StudentProfileComponent } from './user-student/student-profile/student-profile.component';
import { InfoComponent } from './general/info/info.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { LoginStudentComponent } from './general/login/login-student/login-student.component';
import {MockBackend} from '@angular/http/testing';
import { FeedbackComponent } from './general/feedback/feedback.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AgmCoreModule } from '@agm/core';
import { ComingSoonComponent } from './general/coming-soon/coming-soon.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PrivacyPolicyComponent } from './general/privacy-policy/privacy-policy.component';
import { TermsUsageComponent } from './general/terms-usage/terms-usage.component';
import { GceHashCodeComponent } from './general/gce-hash-code/gce-hash-code.component';
import { GceHashCodeNextComponent } from './general/gce-hash-code-next/gce-hash-code-next.component';
import { Vars } from  '../../.env';
import { UploadCvComponent } from './general/upload-cv/upload-cv.component';
import { GceHashCodeProgramComponent } from './general/gce-hash-code-program/gce-hash-code-program.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { GceThesisComponent } from './general/gce-thesis/gce-thesis.component';
import { PartnersCarouselComponent } from './general/partners-carousel/partners-carousel.component';
import {FilterResultsPipe} from './general/gce-thesis/filter-results.pipe';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', children: [
        {path: '', component: LoginComponent},
        {path: 'student', component: LoginStudentComponent}
    ]},
    {path: 'dashboardStudent', component: DashboardStudentComponent, canActivate:[AuthGuardService]},
    {path: 'profileStudent', component: StudentProfileComponent, canActivate:[AuthGuardService]},
    {path: 'wip', component: ComingSoonComponent},
    {path: 'terms-of-use', component: TermsUsageComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'partners', component: PartnersCarouselComponent},
    //{path: 'hashcode', component: GceHashCodeComponent,canActivate:[AuthGuardService]},
    //{path: 'next-steps', component: GceHashCodeNextComponent,canActivate:[AuthGuardService]},
    {path: 'thesis', component: GceThesisComponent, canActivate:[AuthGuardService]}

];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        HomeComponent,
        DashboardStudentComponent,
        FooterComponent,
        FileSelectDirective,
        StudentProfileComponent,
        InfoComponent,
        LoginStudentComponent,
        FeedbackComponent,
        ComingSoonComponent,
        PrivacyPolicyComponent,
        TermsUsageComponent,
        GceHashCodeComponent,
        GceHashCodeNextComponent,
        UploadCvComponent,
        GceHashCodeProgramComponent,
        GceThesisComponent,
        FilterResultsPipe,
        PartnersCarouselComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        ChartsModule,
        AccordionModule.forRoot(),
        BsDatepickerModule.forRoot(),
        RouterModule.forRoot(appRoutes),
        PopoverModule.forRoot(),
        ModalModule.forRoot(),
        ProgressbarModule.forRoot(),
        RatingModule.forRoot(),
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: Vars.GOOGLE_MAPS,
        }),
        FlashMessagesModule,
    ],
    providers: [
        ValidateService,
        AuthService,
        StudentService,
        AuthGuardService,
        ThesisService,
        MockBackend,
        FeedbackService,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
