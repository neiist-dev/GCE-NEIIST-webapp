import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
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
import { StudentProfileComponent } from './user-student/student-profile/student-profile.component';
import { InfoComponent } from './general/info/info.component';
import { LoginStudentComponent } from './general/login/login-student/login-student.component';
import {MockBackend} from '@angular/http/testing';
import { FeedbackComponent } from './general/feedback/feedback.component';
import { AgmCoreModule } from '@agm/core';
import { ComingSoonComponent } from './general/coming-soon/coming-soon.component';
import { PrivacyPolicyComponent } from './general/privacy-policy/privacy-policy.component';
import { TermsUsageComponent } from './general/terms-usage/terms-usage.component';
import { GceHashCodeComponent } from './general/gce-hash-code/gce-hash-code.component';
import { GceHashCodeNextComponent } from './general/gce-hash-code-next/gce-hash-code-next.component';
import { Vars } from  '../../.env';
import { GceHashCodeProgramComponent } from './general/gce-hash-code-program/gce-hash-code-program.component';
import { ChartsModule } from 'ng2-charts';
import { GceThesisComponent } from './general/gce-thesis/gce-thesis.component';
import { PartnersCarouselComponent } from './general/partners-carousel/partners-carousel.component';
import {FilterResultsPipe} from './general/gce-thesis/filter-results.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from './general/about-us/about-us.component';
import { GceArticlesComponent } from './general/gce-articles/gce-articles.component';
import { GetAdviceComponent } from './general/get-advice/get-advice.component';
import { AreasDump } from './general/gce-thesis/areas-dump';
import { ChatModule } from './general/chat/chat.module';


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
    {path: 'articles', component: GceArticlesComponent},
    {path: 'chatbot', component: GetAdviceComponent, canActivate: [AuthGuardService]},

    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'aboutUs', component: AboutUsComponent},
    {path: 'partners', component: PartnersCarouselComponent},
    /**{path: 'hashcode', children: [
    *    {path: '', component: GceHashCodeComponent,canActivate:[AuthGuardService]},
    *    {path: 'faq', component: PrivacyPolicyComponent}
    ]},
    {path: 'next-steps', component: GceHashCodeNextComponent,canActivate:[AuthGuardService]},*/
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
        StudentProfileComponent,
        InfoComponent,
        LoginStudentComponent,
        FeedbackComponent,
        ComingSoonComponent,
        PrivacyPolicyComponent,
        TermsUsageComponent,
        GceHashCodeComponent,
        GceHashCodeNextComponent,
        GceHashCodeProgramComponent,
        GceThesisComponent,
        FilterResultsPipe,
        PartnersCarouselComponent,
        AboutUsComponent,
        GceArticlesComponent,
        GetAdviceComponent

    ],
    imports: [
        BrowserModule,
        ChatModule,
        FormsModule,
        HttpModule,
        NgbModule,
        ReactiveFormsModule,
        ChartsModule,
        JwtModule.forRoot({
            config: {
                whitelistedDomains: ['localhost:3001', 'localhost:8080', 'gce-neiist.org',
                                    'gce-neiist-development.herokuapp.com', 'gce-neiist-staging.herokuapp.com/',
                                    'fenix.tecnico.ulisboa.pt/oauth, maps.googleapis.com']
            }
        }),
        RouterModule.forRoot(appRoutes),
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
        BaseRequestOptions,
        AreasDump
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
