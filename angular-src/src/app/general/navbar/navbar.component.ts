import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router,NavigationEnd } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  LogoWidth: string;
  LogoHeight: string;
  name: string = "Perfil";

  constructor(private authService: AuthService, private router: Router,
              private flashMessage: FlashMessagesService
  ) {
    this.LogoPath = "/assets/img/gce.png";

  }

  ngOnInit() {
    // does not work getting the user on init because it might not be logged in,
    // the student-dashboard link is only defined after page refresh

    //this.loadUserAndDashboardLink();
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      window.scroll(0, 0);
    });

    this.loadUser();
  }

  onLogoutClick() {
    this.authService.logOut();
    this.flashMessage.show("Logged out", {cssClass: 'alert-info', timeout: 2000});
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

}
