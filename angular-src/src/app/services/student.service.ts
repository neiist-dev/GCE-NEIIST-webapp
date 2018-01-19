import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import { environment } from './../../environments/environment';
import { AuthService} from './auth.service';
import 'rxjs/add/operator/map'

@Injectable()
export class StudentService {

  constructor(private http:Http, private authService: AuthService) { }

  getTotalNumberOfRegisteredStudents() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.authService.loadTokenUser(headers);
    return this.http.get('student/numberOfStudents', {headers: headers}).map(res => res.json());
  }

  saveResume(student) {
    let headers = new Headers();
    this.authService.loadTokenUser(headers);
    headers.append('Content-Type', 'application/json');
    return this.http.post('student/saveResume', {"user": student}, {headers: headers}).map(res => res.json());
  }

  //TODO add auth headers, in case the signup is via fenix
  signup(student,info) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('gce/signupHashCode', {"user": student, "signup":info}, {headers: headers}).map(res => res.json());
  }

  getResume() {
    let headers = new Headers();
    this.authService.loadTokenUser(headers);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/student/resume', {headers: headers}).map(res => res.json());
  }

  applyToProposal(application) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.authService.loadTokenUser(headers);
    return this.http.post('student/apply', application, {headers: headers}).map(res => res.json());
  }

  getStudentApplications() {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.authService.loadTokenUser(headers);
    return this.http.get('student/myApplications', {headers: headers}).map(res => res.json());

  }

}
