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
  public eventID: string = " ";
  public currentTime: string = " ";
  public eventsPageTextTodayEvents!: any;
  public eventsPageTextUpcomingEvents!: any;
  public eventsPageTextTodayEventsOrdered!: any;
  public eventsPageTextUpcomingEventsOrdered!: any;


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
      this.currentTime = this.getCurrentDate();
      this.eventsPageTextTodayEvents = this.todaysList(this.currentTime, this.eventsPageText);

      this.eventsPageTextUpcomingEvents = this.upcomingList(this.currentTime, this.eventsPageText);
      this.eventsPageTextTodayEventsOrdered = this.orderByTime(this.eventsPageTextTodayEvents);

      this.eventsPageTextUpcomingEventsOrdered = this.orderByDate(this.eventsPageTextUpcomingEvents);

      // this.eventsPageText = this.eventGetterService.events;
      // this.eventsPageTextTimeOrdered = this.orderByTime(this.eventsPageText);
      // console.log(this.eventsPageText,"OG event list");
      // this.currentTime = this.getCurrentDate();
      // console.log(this.eventsPageTextTimeOrdered,"time ordered events, ALL");
      // console.log(this.currentTime,"this is the current date");
      // this.eventsPageTextTodayEvents = this.todaysList();
      // console.log(this.eventsPageTextTodayEvents, "these are the events happening today");
    }, 1000);
  }

  orderByTime(StartArray:any): any {
    if (StartArray && Array.isArray(StartArray)){
      return [...StartArray].sort((a: any, b: any) =>{
        return parseInt(a.StartTime, 10) - parseInt(b.StartTime, 10);
      });
    } else {
      console.error("Events date for today is not available or not an array.");
    }
  }

  orderByDate(StartArray:any): any {
    if (StartArray && Array.isArray(StartArray)){
      return [...StartArray].sort((a: any, b: any) => {
        const dateA = new Date(a.Date);
        const dateB = new Date(b.Date);
        console.log(dateA, "this is date A.", dateB, "this is date B.");
        return dateA.getTime() - dateB.getTime();
      });
    } else {
      console.error("Events date for upcoming is not available or not an array");
    }
  }

  getCurrentDate(){
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2,'0');
    const month = (currentDate.getMonth()+1).toString().padStart(2,'0');
    return `${day}-${month}`;
  }

  todaysList(currentDate:string, eventList:any){
    const L = this.eventsPageText.length;
    const outputArray: any[] = [];
    let n = 0;
    while (n < L ){
      if (String(eventList[n].Dato)==currentDate){
        outputArray.push(eventList[n]);
        n++;
      }
      else{
        n++;
      }
    }
    return outputArray;
  }

  getDayOfYear(dataString: string): number{
    const [day, month] = dataString.split('-').map(Number)
    const date = new Date(new Date().getFullYear(), month- 1, day);
    const startOfYear = new Date(date.getFullYear(),0,0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  upcomingList(currentDate:string, eventList:any){
    const L = eventList.length;
    const outputArray: any[] = [];
    const currentDayOfYear = this.getDayOfYear(currentDate);
    let n = 0;
    while (n < L){
      const eventDayOfYear = this.getDayOfYear(eventList[n].Dato);
      if ( eventDayOfYear > currentDayOfYear) {
        outputArray.push(eventList[n]);
      }
      n++
    }
    return outputArray;
  }

  reDirectToCreateNewEvent(): void{
    this.router.navigate(['/Events-Create']);
  }


}


