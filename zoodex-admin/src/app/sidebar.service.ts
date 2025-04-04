import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private IsOpen = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.IsOpen.asObservable();

  toggle(){
    this.IsOpen.next(!this.IsOpen.value);
  }

  open(){
    this.IsOpen.next(true);
  }

  close(){
    this.IsOpen.next(false);
  }
}
