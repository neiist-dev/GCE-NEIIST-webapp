import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

@Component({
    selector: 'app-student-profile',
    templateUrl: './student-profile.component.html',
    styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
    user: object;
    TYPE: string;
    company: object;
    partner: object;
    student: object;
    resume: File;
    FileItem: File;
    //Declarations concerning uploading
    public uploader:FileUploader;




    constructor(private authService: AuthService,
                private flashMessage: FlashMessagesService
    ) {

        this.uploader = new FileUploader({
            url: 'http://localhost:3101/student/saveResume',
            authToken: localStorage.getItem('authToken')});

        this.uploader.onErrorItem = (item, response, status, headers):any => this.uploader.onErrorItem(item, response, status, headers);


    }

    /*
        this.uploader = new FileUploader({
        url: 'http://localhost:8080/student/saveResume',
        authToken: localStorage.getItem('authToken')});
            this.zone = new NgZone({ enableLongStackTrace: false });


      this.uploader.onErrorItem = this.zone.run(() => function (item, response, status, headers) {
        let error = JSON.parse(response); //error server response
        console.log(error);
        this.flashMessage.show("Erro", {cssClass: 'alert-info', timeout: 10000});
      });

    */


    ngOnInit() {
        //TODO: This can be the student's profile component
        this.loadUser();
        this.uploader = new FileUploader({
            url: 'http://localhost:3101/student/saveResume',
            authToken: localStorage.getItem('authToken'),
            headers: [{name:'Accept', value:'application/json'}],
            autoUpload: false,
        });

        this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    }

    //When response is received from student-routes
    onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
        let parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        if (parsedResponse.succeeded)  {
            this.flashMessage.show(parsedResponse.message, {cssClass: 'alert-success', timeout: 10000});
        } else {
            item.isSuccess = false;
            item.isError = true;
            this.flashMessage.show(parsedResponse.message, {cssClass: 'alert-danger', timeout: 10000});
        }
    }

    loadUser() {
        this.user = this.authService.loadUserProfile();
        this.TYPE = this.authService.getCurrentUserType();
        if (this.TYPE == 'Company')  {
            this.company = this.authService.loadUserProfile();
        } else if (this.TYPE == 'Partner') {
            this.partner = this.authService.loadUserProfile();
        } else if (this.TYPE == 'Student') {
            //Student
            //ID, Name, Email, Type, Course

        } else if (this.TYPE == 'Admin') {
            // TODO
        }

    }
}
