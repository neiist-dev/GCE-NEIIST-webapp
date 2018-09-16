import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'app-student-profile',
    templateUrl: './student-profile.component.html',
    styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
    user: any;
    TYPE: string;
    company: any;
    partner: any;
    student: any;

    constructor(private authService: AuthService,
                private flashMessage: FlashMessagesService
    ) {}


    ngOnInit() {
        //TODO: This can be the student's profile component
        this.loadUser();
    }

    loadUser() {
        this.user = this.authService.loadUserProfile();
        this.TYPE = this.authService.getCurrentUserType();
        if (this.TYPE == 'Student') {
            //Student
            //ID, Name, Email, Type, Course

        } else if (this.TYPE == 'Admin') {
            // TODO
        }

    }
}
