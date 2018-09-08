import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    lat: number = 38.737901;
    lng: number = -9.137857;

    ngOnInit() {

    }

}
