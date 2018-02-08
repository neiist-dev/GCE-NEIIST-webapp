import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import { AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router:Router) { }

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
