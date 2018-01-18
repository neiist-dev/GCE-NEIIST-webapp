import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import { AuthService} from './auth.service';
import {FlashMessagesService} from "angular2-flash-messages";

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router:Router,
              private flashMessage: FlashMessagesService) { }

  //Checks loggin using token not expired
  canActivate() {
    if(this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
