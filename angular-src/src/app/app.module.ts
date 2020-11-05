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
import { AuthGuardService } from './services/auth-guard.service';
import { FeedbackService } from './services/feedback.service';
import { FooterComponent } from './general/footer/footer.component';
import { StudentProfileComponent } from './user-student/student-profile/student-profile.component';
import { LoginStudentComponent } from './general/login/login-student/login-student.component';
import {MockBackend} from '@angular/http/testing';
import { ComingSoonComponent } from './general/coming-soon/coming-soon.component';
import { PrivacyPolicyComponent } from './general/privacy-policy/privacy-policy.component';
import { Vars } from  '../../.env';
import { GceThesisComponent } from './general/gce-thesis/gce-thesis.component';
import { FilterResultsPipe } from './general/gce-thesis/filter-results.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GceArticlesComponent } from './general/gce-articles/gce-articles.component';
import { AreasDump } from './general/gce-thesis/areas-dump';
import { PinnedArticleComponent } from './general/gce-articles-pinned/gce-articles-pinned.component'

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'login', children: [
            { path: '', component: LoginComponent },
            { path: 'student', component: LoginStudentComponent }
        ]
    },
    { path: 'profileStudent', component: StudentProfileComponent, canActivate: [AuthGuardService] },
    { path: 'wip', component: ComingSoonComponent },
    { path: 'articles', component: GceArticlesComponent },

    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'thesis', component: GceThesisComponent, canActivate: [AuthGuardService] }

];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        HomeComponent,
        FooterComponent,
        StudentProfileComponent,
        LoginStudentComponent,
        ComingSoonComponent,
        PrivacyPolicyComponent,
        GceThesisComponent,
        FilterResultsPipe,
        GceArticlesComponent,
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
