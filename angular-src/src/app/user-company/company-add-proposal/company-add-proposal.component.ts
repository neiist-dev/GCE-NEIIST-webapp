import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { ptBr } from 'ngx-bootstrap/locale';
defineLocale('pt', ptBr);

@Component({
  selector: 'app-proposal-company',
  templateUrl: './company-add-proposal.component.html',
  styleUrls: ['./company-add-proposal.component.css','../../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css']
})
export class CompanyAddProposalComponent implements OnInit {
  public disabled: boolean = false;
  company: any;
  description: string;
  requirements: string;
  date_beginning: Date;
  date_end: Date;
  salary: string;
  observations: string;
  vacancies: string;
  link: string;

  minDate = new Date(2018, 1, 1);
  maxDate = new Date(2020, 1, 1);
  _bsValue: Date;
  _bsRangeValue: any;
  dateBeg:any;
  dateEnd:any;
  bsConfig: Partial<BsDatepickerConfig>;

  locale = 'pt';

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private companyService: CompanyService,
              private router: Router
  ) {}

  ngOnInit() {
    this.company = this.companyService.loadCompanyProfile();
    this.bsConfig = Object.assign({}, {containerClass: "theme-dark-blue",
                                                      locale: this.locale});

  }

  get bsValue(): Date {
    return this._bsValue;
  }

  set bsValue(v: Date) {
    this._bsValue = v;
  }

  get bsRangeValue(): any {
    return this._bsRangeValue;
  }

  set bsRangeValue(v: any) {
    this._bsRangeValue = v;
  }

  getFormattedDate(date) {
    let year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return  day + '/' + month+ '/' + year;
  }

  addProposal() {
    //The proposal reference is no longer company's ID, but it's name
    //const companyId = this.company.id;

    let proposal = {
      company: this.company.name,
      description: this.description,
      requirements: this.requirements,
      date_beginning: this._bsRangeValue[0],
      date_end: this._bsRangeValue[1],
      salary: this.salary,
      observations: this.observations,
      vacancies: this.vacancies,
      link: this.link
    };
    // Check if all fields are filled
    // if (!this.validateService.validateFieldsProposal(proposal))  {
    //   this.flashMessage.show('Por favor, preencha todos os campos', {cssClass: 'alert-danger', timeout: 1000});
    //   return false;
    // }

    if (!this.validateService.validateDates(proposal))  {
      this.flashMessage.show('Por favor introduza datas válidas', {cssClass: 'alert-danger', timeout: 1000});
      return false;
    }

    proposal.date_beginning = this.getFormattedDate(this._bsRangeValue[0]);
    proposal.date_end = this.getFormattedDate(this._bsRangeValue[1]);

    this.companyService.addProposal(proposal).subscribe(data => {
      if (data.succeeded) {
        this.flashMessage.show('Proposta adicionada com sucesso', {cssClass: 'alert-success', timeout: 1000});
        this.router.navigate(['/', 'dashboardCompany']).then(nav => {
        }, err => {
          console.log(err);
        });
      } else {
        this.flashMessage.show('Proposta já existente', {cssClass: 'alert-danger', timeout: 1000});

      }
    });
  }
}
