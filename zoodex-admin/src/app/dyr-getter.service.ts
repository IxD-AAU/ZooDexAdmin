import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DyrGetterService {

  public dyr!: any;

  constructor(private http: HttpClient) {
    this.setTranslations();
   }

   private setTranslations() {
    this.http.get('Dyr/Dyr.json').subscribe(data => {
      this.dyr = data;
    });
  }

  getAnimalsInZoo():string[] {
    if (!this.dyr || !this.dyr.DYR){
      return [];
    }

    return Object.keys(this.dyr.DYR).filter(key=> this.dyr.DYR[key].In_Zoo === "Yes");
  }

}
