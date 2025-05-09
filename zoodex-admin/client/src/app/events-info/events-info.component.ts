import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events-info',
  imports: [SidebarComponent, FormsModule],
  templateUrl: './events-info.component.html',
  styleUrl: './events-info.component.css'
})
export class EventsInfoComponent implements OnInit {

  constructor(
    public sidebarService: SidebarService
  ){}

  ngOnInit(): void {
      this.sidebarService.open();
  }
  submitForm(): void {

  }
}
