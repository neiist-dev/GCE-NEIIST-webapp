import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-login-professor',
  templateUrl: './login-professor.component.html',
  styleUrls: ['./login-professor.component.css']
})
export class LoginProfessorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private authService : AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) {

}

  ngOnInit() {
      let token = 'mockToken';
      this.authService.registerProfessor(token).subscribe(response => {
        if (response.succeeded) {
          this.authService.storeData(response.response_data.user, response.response_data.token);
          this.flashMessage.show("É a primeira vez? Veja a secção Profile", {cssClass: 'alert-info', timeout: 3000});
          this.router.navigate(['dashboardProfessor']);
        } else {
          this.flashMessage.show("Error at logging in - professor", {cssClass: 'alert-danger', timeout: 1000});
        }
      });
  }

}
