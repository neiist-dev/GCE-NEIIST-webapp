import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';



@Injectable()
export class ArticlesService {

    constructor(private http:Http) { }

    getAllArticles() {
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        return this.http.get('articles/getArticles', {headers: headers}).pipe(map(res => res.json()));
    }

}
