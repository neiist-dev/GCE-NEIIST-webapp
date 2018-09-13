import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: object;
  type: string;
  link: string;
  LogoPath: string;
  name: string = "Perfil";

    sidebarVisible: boolean;

  constructor(private authService: AuthService, private router: Router, public location: Location, private element : ElementRef
  ) {
    this.LogoPath = "/assets/img/gce.png";
      this.sidebarVisible = false;

  }

  ngOnInit() {
    // does not work getting the user on init because it might not be logged in,
    // the student-dashboard link is only defined after page refresh

    //this.loadUserAndDashboardLink();
    /*this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      window.scroll(0, 0);
    });
    */
    this.loadUser();

  }

  onLogoutClick() {
    this.authService.logOut();
    this.router.navigate(['/']);
    return false;
  }

  loadUser() {
    const user = this.authService.loadUserProfile();

      if (user == null)   {
        return;
    }
    let endOfFirstName = user.name.indexOf(" ");
    let firstName = user.name.slice(0,endOfFirstName);
    this.name = firstName;
  }

    isHome() {
        const titlee = this.location.prepareExternalUrl(this.location.path());
        return titlee === '/';
    }

    isFaq() {
        const titlee = this.location.prepareExternalUrl(this.location.path());
        return titlee === '/faq';
    }

    isLoginPage() {
        const titlee = this.location.prepareExternalUrl(this.location.path());
        return titlee === '/login';
    }

    isLoggedInStudent() {
        return this.authService.loggedIn() && this.authService.getCurrentUserType() === 'Student';
    }

    isLoggedIn() {
        return this.authService.loggedIn();
    }
}

