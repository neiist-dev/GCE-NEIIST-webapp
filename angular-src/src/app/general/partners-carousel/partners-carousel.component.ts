import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-partners-carousel',
  templateUrl: './partners-carousel.component.html',
  styleUrls: ['./partners-carousel.component.css'],
  providers: [NgbCarouselConfig ]
})
export class PartnersCarouselComponent implements OnInit {

  constructor(config: NgbCarouselConfig) { 
      config.interval = 3000;
      config.wrap = true;
      config.keyboard = false;
      config.pauseOnHover = false;
      config.showNavigationArrows = false;
      config.showNavigationIndicators = false;
  }

  ngOnInit() {
  }

}
