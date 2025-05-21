import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DyrGetterService {

  public dyr!: any;
  public dyr_archive!: any;

  constructor(private http: HttpClient) {
    this.setTranslations();
   }

   private setTranslations() {
    this.http.get('http://localhost:3000/api/dyr').subscribe(data => {
      this.dyr = data;
    });
    this.http.get('http://localhost:3000/api/dyr_STORAGE').subscribe(data => {
      this.dyr_archive = data;
    })
  }

  getAnimalsInZoo():string[] {
    if (!this.dyr || !this.dyr.DYR){
      return [];
    }

    return Object.keys(this.dyr.DYR).filter(key=> this.dyr.DYR[key].In_Zoo === "Yes");
  }

}
