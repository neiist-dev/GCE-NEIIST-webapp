import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit { user: object;
  company: object;

  constructor(private authService: AuthService, private router: Router,
              private flashMessage: FlashMessagesService
  ) {

  }


  ngOnInit() {
    //TODO: This can be the student's profile component
    this.loadUser();
  }

  loadUser() {
    this.company = this.authService.loadUserProfile();

  }
}
