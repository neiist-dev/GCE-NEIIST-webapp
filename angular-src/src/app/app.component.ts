import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  
  navbarVisible = true;
  previousY = 0;
  constructor(private router: Router) {
    this.routeEvent(this.router);
  }
     

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  routeEvent(router: Router){
    router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
        this.navbarVisible = true;
      }
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


      if(this.contadorDescer < -150){    
        this.navbarVisible = false;
        this.contadorDescer = -150;
        if(this.Switch == 1){
          this.Switch = -1;
        }
      }
      else if(this.contadorDescer > 100){
        this.contadorDescer = 100;
        this.navbarVisible = true;

        if(this.Switch == -1){
          this.Switch = 1;
        }
      }
      this.previousY = currentY;

    }

}