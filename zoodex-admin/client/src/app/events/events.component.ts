import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-events',
  imports: [SidebarComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  constructor(public sidebarService: SidebarService) { }
  ngOnInit(): void {
    this.sidebarService.open();
  }
}


