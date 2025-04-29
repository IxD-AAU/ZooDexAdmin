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
    this.http.get('http://localhost:3000/api/personale').subscribe( data => {
      this.personale = data;
    });
  }
  public getPersonaleData(){
    return (this.http.get('http://localhost:3000/api/personale'));
  }
}
