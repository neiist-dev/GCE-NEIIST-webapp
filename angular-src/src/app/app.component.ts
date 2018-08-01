import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'GCE';
  controlVariable: boolean;

  onActivate(component) {
    this.controlVariable = !component.isHome;
  }
}