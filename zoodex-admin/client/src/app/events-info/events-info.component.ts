import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar.service';
import { FormsModule } from '@angular/forms';
import { EventGetterService } from '../event-getter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatabaseHandlerService } from '../database-handler.service';
import { response } from 'express';

@Component({
  selector: 'app-events-info',
  imports: [SidebarComponent, FormsModule, CommonModule],
  templateUrl: './events-info.component.html',
  styleUrl: './events-info.component.css'
})
export class EventsInfoComponent implements OnInit {

  public eventsPageText!: any;
  public eventID: number = 0;
  isDataReady: boolean = false;
  public displayIndex: number = 0;

  constructor(
    public sidebarService: SidebarService,
    public readonly eventGetterService: EventGetterService,
    private route: ActivatedRoute,
    private router: Router,
    public databaseHandlerService: DatabaseHandlerService

  ){}

  ngOnInit(): void {
      this.sidebarService.open();

    this.route.queryParams.subscribe((params) => {
      this.eventID = Number(params['id']);
    })

      setTimeout(()=>{
        this.eventGetterService.getEventsData().subscribe((data) =>{
          this.eventGetterService.events = data;
        })
        this.eventsPageText = this.eventGetterService.events;
        console.log(this.eventsPageText);
        this.isDataReady = true;
        console.log(this.eventID);
        this.displayIndex = this.Findindex(this.eventID);
        console.log(this.displayIndex);
      }, 100)
  }
  submitForm(): void {
    const dataToSend = this.eventsPageText[this.eventID];
    const dataSet = "Events";
    const dataID = this.eventID;
    console.log(dataID);
    console.log("DATA UPDATED");
    this.databaseHandlerService.updateDatabase(this.eventID,dataToSend,dataSet).subscribe({
      next: (response) => {
        console.log("Data update successfully:", response);
        alert("Data opdateret!");
      },
      error: (error) => {
        console.error("Error updating data:", error);
        alert("Der skete en fejl under opdateringen af data.")
      }
    })
  }
  removeData(): void{
    const dataID = this.eventID;
    const dataSet = "Events"
    alert("Er du sikker på at du vil slette aktiviteten?");
    if (confirm("Er du sikker på at du vil slette aktiviteten?")) {
      this.databaseHandlerService.deleteDatabase(dataID,dataSet).subscribe({
        next: (response) => {
          console.log("Data removed  successfully:", response);
          alert("Aktivitet Slettet!");
        },
        error: (error)=>{
          console.error("Error removing data:", error);
          alert("Der skete en fejl under sletningen af aktivteten.");
        }
      })
    }
  }
  reDirectBack(): void{
    this.router.navigate(['/Events']);
  }

  Findindex(id: number):number{
    return this.eventsPageText.findIndex((event: any)=> event.ID === id);
  }

}
