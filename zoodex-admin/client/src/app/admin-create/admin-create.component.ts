import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseHandlerService } from '../database-handler.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create',
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.css'
})
export class AdminCreateComponent implements OnInit {

  public newUser: {Username: string, Password: string, FirstName: string, LastName: string, Mail: string, Job: string, Dataset: string;} = {
    Username: '',
    Password: '',
    FirstName: '',
    LastName: '',
    Mail: '',
    Job: '',
    Dataset: 'Personale'
  };

  public JobType: string = '';

constructor(
  public sidebarService: SidebarService,
  public databaseHandlerService: DatabaseHandlerService,
  public router: Router

){}

  ngOnInit():void{
    this.sidebarService.open;
  }
  submitForm():void{
    console.log("Data to send:",this.newUser);
    this.databaseHandlerService.insertDatabase(this.newUser,"Personale").subscribe(
      (response)=>{console.log('User Created', response);},
      (error)=>{console.log('Error', error);}
    );
    this.router.navigate(['/Admin']);
  }
}
