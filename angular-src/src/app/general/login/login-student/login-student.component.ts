import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {StudentService} from "../../../services/student.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private authService : AuthService,
              private studentService: StudentService, private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let token = params['code'];
      this.authService.registerStudent(token).subscribe( response => {
        if (response.succeeded){
          this.authService.storeData(response.response_data.user, response.response_data.token);
          this.flashMessage.show("Ao fazeres login, estás a concordar com a nossa Política de Privacidade.", {cssClass: 'alert-info', timeout: 10000});
          this.router.navigate(['dashboardStudent']);
        } else {
          this.flashMessage.show("Erro interno. Por favor contacte a administração. Obrigado.", {cssClass: 'alert-danger', timeout: 5000});}
      });
    });
  }

}
