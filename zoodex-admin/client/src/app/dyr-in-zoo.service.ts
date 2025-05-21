import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DyrInZooService {

  public dyrInZoo!: any;
  public dyrInZooList: any[] = [];
  constructor(private http: HttpClient) { }

  setDyrInZoo(dyrInZoo: any) {
    this.dyrInZoo = dyrInZoo;
  }

  getDyrInZoo() {
    return this.dyrInZoo;
  }

  setDyrInZooList(dyrInZooList: any[]) {
    this.dyrInZooList = dyrInZooList;
  }

  getDyrInZooList() {
    return this.dyrInZooList;
  }
}
