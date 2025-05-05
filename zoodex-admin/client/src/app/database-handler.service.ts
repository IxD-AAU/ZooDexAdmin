import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseHandlerService {
  private apiUrl = 'http://localhost:3000/api';
  public body: any;

  constructor(private http: HttpClient) {}


  updateDatabase(id: number, data: any, dataSet: String): Observable<any> {
    this.body = {
      ID: id+1,
      Data: data,
      DataSet: dataSet
    };
    return this.http.post(`${this.apiUrl}/database/update`, this.body);
  }
  insertDatabase(data: any, dataSet: String): Observable<any>{

    this.body = {
      Data: data,
      DataSet: dataSet
    };

    return this.http.post(`${this.apiUrl}/database/insert`, this.body);
  }
  deleteDatabase(ID: number, DataSet: String): Observable<any> {

    this.body = {
      ID: ID+1,
      DataSet: DataSet
    }

    return this.http.post(`${this.apiUrl}/database/delete`, this.body);
  }
  StoreDatabse(ID: number, DataSet: String): Observable<any>{

    this.body = {
      ID: ID+1,
      DataSet: DataSet
    };

    return this.http.post(`${this.apiUrl}/database/store`, this.body);
  }
  RetriveDatabase(ID: number, DataSet: String): Observable<any>{
    this.body = {
      ID: ID+1,
      DataSet: DataSet
    };

    return this.http.post(`${this.apiUrl}/database/retrieve`, this.body);
  }

}

