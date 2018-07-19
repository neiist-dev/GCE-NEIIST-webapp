import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
import { FlashMessagesService} from 'angular2-flash-messages';
import { ValidateService} from '../../services/validate.service';
import { Vars } from '../../../../.env';
import { Subscription } from 'rxjs/Subscription';
import { ChangeDetectorRef} from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string;
  password: string;
  studentPath: string;
  professorPath: string;

    private subscriptions: Array<Subscription> = [];

  constructor(private authService: AuthService, private router: Router,
              private flashMessage: FlashMessagesService, private validateService: ValidateService,
              private cd: ChangeDetectorRef
              ) {


    const clientId = Vars.FENIX_CLIENT_ID;
    const redirectUri = Vars.REDIRECT_URL;
    const redirectUriProf = Vars.REDIRECT_URL_PROF;

    this.studentPath = 'https://fenix.tecnico.ulisboa.pt/oauth/userdialog?' +
                        'client_id=' + clientId + '&redirect_uri=' + redirectUri;

    this.professorPath = redirectUriProf;
  }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.cd.detach();
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();

        });
    }

  onLoginSubmit() {
    if (this.authService.loggedIn())    {
        this.flashMessage.show('Já fez login no sistema. Faça logout.', {cssClass: 'alert-danger', timeout: 2000});
        return false;
    }
    const user = {
      username: this.username,
      password: this.password
    };

    if (!this.validateService.validateLogin(this.username))  {
      this.flashMessage.show('Por favor, introduza o nome de utilizador', {cssClass: 'alert-danger', timeout: 1000});
      return false;
    }

    if (!this.validateService.validateLogin(this.password))  {
      this.flashMessage.show('Por favor, introduza a password', {cssClass: 'alert-danger', timeout: 1000});
      return false;
    }

    //TODO: Add Autorization header, or remove route protection on user
    //The student is treated at student-register.component
    this.subscriptions.push(this.authService.authUser(user).subscribe( response => {
      if (response.succeeded) {
        this.authService.storeData(response.response_data.user, response.response_data.token);
        this.flashMessage.show(response.message, {cssClass: 'alert-info', timeout: 3000});
      } else {
        this.flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 1000});
        this.router.navigate(['/', 'login']);
      }

      this.router.navigate(['profile']);

    }));
  }
}
