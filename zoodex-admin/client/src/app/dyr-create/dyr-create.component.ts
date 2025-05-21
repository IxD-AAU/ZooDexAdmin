import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseHandlerService } from '../database-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dyr-create',
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './dyr-create.component.html',
  styleUrl: './dyr-create.component.css'
})
export class DyrCreateComponent implements OnInit{

  public selectedDataSet: string = '';
  public newDyrPageText: {Name: string; Type: string; Description: string; Personality: string; WeightMaleMin: number; WeightMaleMax: number; WeightFemaleMin: number; WeightFemaleMax: number; Height: number; Speed: number; YoungMin: number; YoungMax: number; DataSet: string;} = {
    Name: '',
    Type: '',
    Description: '',
    Personality: '',
    WeightMaleMin: 0,
    WeightMaleMax: 0,
    WeightFemaleMin: 0,
    WeightFemaleMax: 0,
    Height: 0,
    Speed: 0,
    YoungMin: 0,
    YoungMax: 0,
    DataSet: ''
  };

  constructor(
    public router: Router,
    public sidebarService: SidebarService,
    public databaseHandlerService: DatabaseHandlerService
  ){}

  ngOnInit(): void {
    this.sidebarService.open
  }
  submitForm(): void{
    console.log(this.newDyrPageText);
    console.log(this.selectedDataSet);
    if (this.selectedDataSet=="Ja"){
      this.newDyrPageText.DataSet="DyrSTORAGE";
    }
    else if (this.selectedDataSet=="Nej"){
      this.newDyrPageText.DataSet="Dyr";
    }
    console.log("Data to send:", this.newDyrPageText);
    this.databaseHandlerService.insertDatabase(this.newDyrPageText,this.newDyrPageText.DataSet).subscribe(
      (response)=>{console.log('Dyr Created', response);},
      (error)=>{console.log('Error', error);}
    );;
  }
  reDirectBack(): void{
    this.router.navigate(['/Dyr']);
  }
}

