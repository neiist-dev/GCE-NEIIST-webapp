import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import {AuthService} from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class MatchmakingService {

  constructor(private http:Http, private authService: AuthService) { }

  invalidateApplication(id) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.authService.loadTokenUser(headers);
    return this.http.put('student/applications/invalidate', id, {headers: headers}).map(res => res.json());
  }

}
