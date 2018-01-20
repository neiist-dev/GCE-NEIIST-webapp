import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FlashMessagesService} from "angular2-flash-messages";
import { ChangeDetectorRef} from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private flashMessage: FlashMessagesService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

    ngOnDestroy() {
        this.cd.detach();
    }

  clickStudent()  {
      this.flashMessage.show('Não é necessário fazer inscrição. Faz Login através do Fénix.', {cssClass: 'alert-info', timeout: 5000});
      this.router.navigate(['login'], );
  }

  clickCompany() {
    this.router.navigate(['/register/company'], );
  }

  clickPartner() {
    this.router.navigate(['/register/partner'], );
  }

}
