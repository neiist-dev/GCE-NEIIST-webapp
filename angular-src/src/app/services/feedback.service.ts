import { Injectable } from '@angular/core';
import { Http, Headers} from "@angular/http";
import { map } from 'rxjs/operators';

@Injectable()
export class FeedbackService {
  feedback:any;

  constructor(private http:Http) { }

  sendFeedback(feedback) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/feedback', feedback, {headers: headers}).pipe(map(res => res.json()));
  }
}
