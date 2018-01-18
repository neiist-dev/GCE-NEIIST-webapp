import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  lat: number = 38.737901;
  lng: number = -9.137857;
  private fragment: string;
  Registar: string;

  constructor(private route: ActivatedRoute) {
    this.Registar = "http://localhost:8080/register";
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });
  }

  onAnchorClick ( ) {
    this.route.fragment.subscribe ( f => {
      const element = document.querySelector ( "#" + f );
      if ( element ) element.scrollIntoView();
    });
  }

}
