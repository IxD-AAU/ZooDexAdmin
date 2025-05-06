import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventGetterService {

  public events!: any;

  constructor(private http: HttpClient) {
    this.setTranslations();
   }

    private setTranslations() {
      this.http.get('http://localhost:3000/api/events').subscribe(data => {
        this.events = data;
      });
}
  public getEventsData() {
    return (this.http.get('http://localhost:3000/api/events'));
  }

}
