import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  navbarVisible = true;
  previousY = 0;
    constructor(private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

  title = 'GCE';
  controlVariable: boolean;
  contadorDescer = 0;
  Switch = -1;

  onActivate(component) {
    this.controlVariable = !component.isHome;
  }

  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
      let currentY = window.pageYOffset;
      if(this.previousY - currentY < 0){ //descer
        this.contadorDescer += this.previousY - currentY;
      } else if(this.previousY - currentY > 0){ //subir  
        this.contadorDescer += this.previousY - currentY;
      }


      if(this.contadorDescer < -200){    
        this.navbarVisible = false;
        this.contadorDescer = -200;
        if(this.Switch == 1){
          this.Switch = -1;
        }
      }
      else if(this.contadorDescer > 200){
        this.contadorDescer = 200;
        this.navbarVisible = true;

        if(this.Switch == -1){
          this.Switch = 1;
        }
      }
      this.previousY = currentY;

    }

}