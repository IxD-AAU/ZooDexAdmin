import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseHandlerService {
  private apiUrl = 'http://localhost:3000/api';


  constructor(private http: HttpClient) {}

  updateDatabase(ID: number, Data: any, DataSet: String): Observable<any> {
    return this.http.post(`${this.apiUrl}/database/update`, { ID, Data, DataSet});
  }
  insertDatabase(Data: any, DataSet: String): Observable<any>{
    return this.http.post(`${this.apiUrl}/database/insert`, {Data, DataSet});
  }

}

