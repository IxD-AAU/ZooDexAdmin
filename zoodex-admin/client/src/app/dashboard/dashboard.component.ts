import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarService } from '../sidebar.service';
import { EventGetterService } from '../event-getter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(
    public sidebarService: SidebarService,
    private readonly eventGetterService: EventGetterService
  ){ }

  public pageText!: any;
  isDataReady: boolean = false;
  public eventsToday!: any;
  isntEventsEmpty: boolean = true;

  ngOnInit(): void {
      this.sidebarService.open();
    setTimeout(() => {
      this.pageText = this.eventGetterService.events
      console.log("Events:",this.pageText);
      this.todaysEvents();
      console.log("events for today:",this.eventsToday);
      this.eventsEmpty();
      this.isDataReady = true;
    }, 2000);


  }

  todaysEvents():void{
    const now = new Date();
    const day = String(now.getDate()).padStart(2,'0');
    const month = String(now.getMonth()+1).padStart(2,'0');
    const today = `${day}-${month}`;

    console.log("today:",today)
    this.eventsToday = this.pageText.filter(
      (event: any)=> event.Dato === today
      );
  }

  eventsEmpty():void{
    if (Array.isArray(this.eventsToday) && this.eventsToday.length === 0){
      this.isntEventsEmpty = false;
    }
    else {
      this.isntEventsEmpty = true;
    }
  }
}
