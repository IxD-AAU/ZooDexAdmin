import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonaleGetterService {

  public personale!: any;

  constructor(private http: HttpClient){
    this.setTranslations();
  }

  private setTranslations(){
    this.http.get('personale/Personale.json').subscribe( data => {
      this.personale = data;
    });
  }
}
