import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { NavbarComponent } from './general/navbar/navbar.component';
import { LoginComponent } from './general/login/login.component';
import { HomeComponent } from './general/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { StudentService } from './services/student.service';
import { ThesisService } from './services/thesis.service';
import { ArticlesService } from './services/articles.service';
import { DashboardStudentComponent } from './user-student/student-dashboard/student-dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FeedbackService } from './services/feedback.service';
import { FooterComponent } from './general/footer/footer.component';
import { StudentProfileComponent } from './user-student/student-profile/student-profile.component';
import { LoginStudentComponent } from './general/login/login-student/login-student.component';
import {MockBackend} from '@angular/http/testing';
import { ComingSoonComponent } from './general/coming-soon/coming-soon.component';
import { PrivacyPolicyComponent } from './general/privacy-policy/privacy-policy.component';
import { TermsUsageComponent } from './general/terms-usage/terms-usage.component';
import { Vars } from  '../../.env';
import { GceThesisComponent } from './general/gce-thesis/gce-thesis.component';
import { PartnersCarouselComponent } from './general/partners-carousel/partners-carousel.component';
import {FilterResultsPipe} from './general/gce-thesis/filter-results.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from './general/about-us/about-us.component';
import { GceArticlesComponent } from './general/gce-articles/gce-articles.component';
import { GetAdviceComponent } from './general/get-advice/get-advice.component';
import { AreasDump } from './general/gce-thesis/areas-dump';
import { PinnedArticleComponent} from './general/gce-articles-pinned/gce-articles-pinned.component'

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
        LoginStudentComponent,
        ComingSoonComponent,
        PrivacyPolicyComponent,
        TermsUsageComponent,
        GceThesisComponent,
        FilterResultsPipe,
        PartnersCarouselComponent,
        AboutUsComponent,
        GceArticlesComponent,
        GetAdviceComponent,
        PartnersCarouselComponent,
        PinnedArticleComponent

    ],
    imports: [
        BrowserModule,
        HttpModule,
        NgbModule,
        JwtModule.forRoot({
            config: {
                allowedDomains: ['localhost:8080', 'fenix.tecnico.ulisboa.pt/oauth'] 
            }
        }),
        RouterModule.forRoot(appRoutes),
    ],
    providers: [
        ValidateService,
        AuthService,
        StudentService,
        AuthGuardService,
        ThesisService,
        ArticlesService,
        MockBackend,
        FeedbackService,
        BaseRequestOptions,
        AreasDump
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
