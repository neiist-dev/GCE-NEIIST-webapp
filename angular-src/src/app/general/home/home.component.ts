import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  isHome = true;
  constructor() { }
  
  ngOnInit() {
    document.body.style.backgroundColor = 'black';
  }
  
  ngOnDestroy() {
    document.body.style.backgroundColor = 'white';
  }

}
