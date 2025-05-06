import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';
import { EventGetterService } from '../event-getter.service';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [SidebarComponent, CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  public eventsPageText!: any;
  public eventsPageTextTimeOrdered!: any;
  public eventID: string = " ";

  constructor(
    public sidebarService: SidebarService,
    public readonly eventGetterService: EventGetterService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }



  ngOnInit(): void {
    this.sidebarService.open();

    this.route.queryParams.subscribe((params)=> {
      this.eventID = params['id'];
    });


    setTimeout(() => {
      this.eventGetterService.getEventsData().subscribe((data) => {
        this.eventGetterService.events = data;
      })
      this.eventsPageText = this.eventGetterService.events;

      this.orderByTime();

      console.log(this.eventsPageText);
      console.log(this.eventsPageTextTimeOrdered);
    }, 1000);
  }
  orderByTime() {
    if (this.eventsPageText && Array.isArray(this.eventsPageText)){
      this.eventsPageTextTimeOrdered = [...this.eventsPageText].sort((a: any, b: any) =>{
        return parseInt(a.StartTime, 10) - parseInt(b.StartTime, 10);
      });
    } else {
      console.error("Events date is not available or not an array.");
    }
  }

}


