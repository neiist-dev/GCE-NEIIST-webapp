import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {

  name: String;
  email: String;
  description: String;
  location: String;
  contact: String;
  password: String;
  confirmPassword: String;
  acceptedTerms: boolean;

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router
              ) {}

  ngOnInit() {
  }

  clicked(event) {
    this.acceptedTerms = true;
  }
  registerCompany() {

    const company = {
      name: this.name,
      email: this.email,
      description: this.description,
      location: this.location,
      contact: this.contact,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

      //Check if all fields are filled
      if (!this.validateService.validateRegisterCompany(company))  {
        this.flashMessage.show("Por favor, preencha todos os campos", {cssClass: 'alert-danger', timeout: 2000});
        return false;
      }

      if(!this.validateService.samePasswords(company.password,company.confirmPassword)) {
        this.flashMessage.show("As passwords não coincidem. Volte a introduzi-las", {cssClass: 'alert-danger', timeout: 2000});
        return false;
      }

      if (!this.acceptedTerms) {
        this.flashMessage.show("Tem de aceitar os termos antes de se registar", {cssClass: 'alert-danger', timeout: 2000});
        return false;
      }
    /*
    if (!this.validateService.validateEmail(user.email))  {
      return false;
    }*/

    this.authService.registerCompany(company).subscribe(data => {
      if (data.succeeded) {
        this.flashMessage.show("Registo efetuado com sucesso. Espere que a sua empresa seja confirmada pela administração.", {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/','login']).then(nav => {
        }, err => {
          console.log(err);
        });
      } else {
        this.flashMessage.show("Empresa " + company.name + " já está registada", {cssClass: 'alert-danger', timeout: 2000});

      }
    });


    }
  }
