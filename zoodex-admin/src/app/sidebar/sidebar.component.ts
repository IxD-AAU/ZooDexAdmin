import { Component } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  IsOpen = false;

  constructor(private sidebarService: SidebarService, private router: Router){
    this.sidebarService.sidebarState$.subscribe(state =>{
      this.IsOpen = state;
    });


  }
  navigateTo(route: string){
    this.router.navigate([route]);
  }
}
