import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { AuthService} from './auth.service';
import { map } from 'rxjs/operators';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AreasDump} from './../general/gce-thesis/areas-dump';


@Injectable()
export class ThesisService {

    private idsBotSource = new BehaviorSubject([]);
    private thesesSource = new BehaviorSubject<number>(0);
    currentTheses = this.thesesSource.asObservable();
    currentIds = this.idsBotSource.asObservable();

    constructor(private http:Http, private authService: AuthService, private areasDump: AreasDump) { }

    getAllTheses() {
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        this.authService.loadTokenUser(headers);
        return this.http.get('theses/getTheses', {headers: headers}).pipe(map(res => res.json()));


    }
    getAreasFromDump(course: string){
        return this.areasDump.getAreas(course);
    }
    
    incrementClicks(id: number){
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        let url = "/theses/incrementClick/" + id.toString();
        this.authService.loadTokenUser(headers);
        return this.http.post(url, "",{headers: headers}).subscribe(
            () => {},
            err => console.error(err)
        );

    }



    changeTheses(availableTheses: number){
        this.thesesSource.next(availableTheses)
    }

    changeIdsBot(newIds: number[]) {
        this.idsBotSource.next(newIds);
    }

    getAreasFromDump(course: string){
        return this.areasDump.getAreas(course);
    }


}
