import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class CompanyService {

  constructor(private http:Http, private authService: AuthService) { }

  //Company dashboard: see own proposals
  getAllCompanyProposals() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.authService.loadTokenUser(headers);
    return this.http.get('company/proposals', {headers: headers}).map(res => res.json());
  }

  //Shows every published proposal
  getAllCompanyAllProposals() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.authService.loadTokenUser(headers);
    return this.http.get('company/allProposals', {headers: headers}).map(res => res.json());
  }

  getCompanyNames() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.authService.loadTokenUser(headers);
    return this.http.get('company/companyNames', {headers: headers}).map(res => res.json());
  }

  getTotalNumberOfCompanies() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.authService.loadTokenUser(headers);
    return this.http.get('company/numberOfCompanies', {headers: headers}).map(res => res.json());
  }

  getTotalNumberOfProposals() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.authService.loadTokenUser(headers);
    return this.http.get('company/numberOfProposals', {headers: headers}).map(res => res.json());
  }

  updateProposal(proposal) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.authService.loadTokenUser(headers);
    return this.http.put('company/proposals/update', proposal, {headers: headers}).map(res => res.json());
  }

  addProposal(proposal) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.authService.loadTokenUser(headers);
    return this.http.put('company/addProposal', proposal, {headers: headers}).map(res => res.json());
  }

    loadCompanyProfile()    {
      return this.authService.loadUserProfile();
    }
}
