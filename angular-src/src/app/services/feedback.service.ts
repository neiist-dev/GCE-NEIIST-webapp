import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";

@Injectable()
export class FeedbackService {
  feedback:any;

  constructor(private http:Http) { }

  sendFeedback(feedback) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/feedback', feedback, {headers: headers}).map(res => res.json());
  }
}
