import { Pipe, PipeTransform } from '@angular/core';
import {ThesisService} from "../../services/thesis.service";

@Pipe({
  name: 'filterResults'
})
export class FilterResultsPipe implements PipeTransform {

    availableTheses: number;
    constructor(private thesisService: ThesisService){}

    ngOnInit(){
        this.thesisService.currentTheses.subscribe(availableTheses => this.availableTheses = availableTheses);
    }

    transform(items: any[], value: string, areas: string[],types: string[], ids: number[]): any[] {


            items = this.filterAreas(items, areas);
            items = this.filterType(items, types);

        if( ids.length == 0 ) {
            if (value != '' && value != null) {
                var splitted = value.split(" ");

                for (var token in splitted) {
                    items = items.filter(e => e.title.toLowerCase().indexOf(splitted[token].toLowerCase()) > -1 ||
                        e.requirements.toLowerCase().indexOf(splitted[token].toLowerCase()) > -1 ||
                        e.objectives.toLowerCase().indexOf(splitted[token].toLowerCase()) > -1 ||
                        e.observations.toLowerCase().indexOf(splitted[token].toLowerCase()) > -1 ||
                        e.supervisors.toString().replace(",", " ").toLowerCase().indexOf(splitted[token].toLowerCase()) > -1);
                }
            }
        }
        else{
            items = items.filter(e => ids.indexOf(Number(e.id))> -1);
        }

        this.thesisService.changeTheses(items.length);

        return items;



    }
    filterAreas(theses: any[], areas: string[]){
        let size = areas.length;
        if (size == 0)
            return theses;
        if (size == 1){
            return theses.filter(e => e.areas.indexOf(areas[0])> -1 || e.specializationAreas.indexOf(areas[0])> -1 )
        }
        if (size == 2){
            return theses.filter(e => (e.areas.indexOf(areas[0])> -1 && e.areas.indexOf(areas[1])> -1) ||  (e.specializationAreas.indexOf(areas[0])> -1 && e.specializationAreas.indexOf(areas[1])> -1))
        }
    }

    filterType(theses: any[],types: string[]){
        if(types.length == 1){
            return theses.filter(e => e.type==types[0])
        }
            return theses;
    }

}
