import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
import { ValidateService} from '../../services/validate.service';
import { Vars } from '../../../../.env';
import { Subscription } from 'rxjs/Subscription';
import { ChangeDetectorRef} from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    @ViewChild('loginStudent') myId: ElementRef;
    username: string;
    password: string;
    studentPath: string;
    professorPath: string;
    public auth: boolean = false;
    public canLogin: boolean = false;

    private subscriptions: Array<Subscription> = [];

    constructor(private authService: AuthService, private router: Router,
                private validateService: ValidateService,
                private cd: ChangeDetectorRef) {


        const clientId = Vars.FENIX_CLIENT_ID;
        const redirectUri = Vars.REDIRECT_URL;

        this.studentPath = 'https://fenix.tecnico.ulisboa.pt/oauth/userdialog?' +
          'client_id=' + clientId + '&redirect_uri=' + redirectUri;

    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.cd.detach();
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();

        });
    }

    toggleAuth() {
        this.auth = !this.auth;
        if (this.auth) {
            this.myId.nativeElement.attributes.class.nodeValue = "btn btn-primary btn-lg";
        } else {
            this.myId.nativeElement.attributes.class.nodeValue = "disabled btn btn-primary btn-lg";
        }
    }
}