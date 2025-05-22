import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar.service';
import { FormsModule } from '@angular/forms';
import { DatabaseHandlerService } from '../database-handler.service';
import { response } from 'express';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-events-create',
  imports: [SidebarComponent, FormsModule],
  templateUrl: './events-create.component.html',
  styleUrl: './events-create.component.css'
})
export class EventsCreateComponent implements OnInit {

  public newEvent: {Name: string; Dato: string; StartTime: string; Info: string}= {
    Name: '',
    Dato: '',
    StartTime: '',
    Info: ''
  };

  constructor(
    public sidebarService: SidebarService,
    public databaseHandlerService: DatabaseHandlerService,
    public router: Router
  ){}


  ngOnInit(): void {
      this.sidebarService.open();
  }

  submitForm(): void{
    if (this.newEvent.StartTime.includes(':')){
      alert("Start tid inkludere :, fjern venlist : og prøv igen.");
      return
    }
    else if (!this.newEvent.StartTime.includes(':')){
      console.log(this.newEvent);
      const Data = this.newEvent;
      const DataSet = "Events";
      this.databaseHandlerService.insertDatabase(Data, DataSet).subscribe(
        (response) => {
          console.log('Event created', response);
          this.router.navigate(['/Events']);
        },
        (error) => {
          console.log('Error', error);
        }
      );
    }
    }
    reDirectBack():void{
      this.router.navigate(['/Events']);
    }
  }
