import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar.service';
import { PersonaleGetterService } from '../personale-getter.service';
import { CommonModule, ɵnormalizeQueryParams } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DatabaseHandlerService } from '../database-handler.service';
import { response } from 'express';


@Component({
  selector: 'app-admin',
  imports: [SidebarComponent, CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  math = Math;
  isDataReady: boolean = false;
  public userPageText!: any;
  public userArchivePageText!: any;
  trueDataSet = '';
  public trueID!: any;
  correctedID: number = 0;

  constructor(
    public sidebarService: SidebarService,
    private readonly personaleGetterService: PersonaleGetterService,
    public router: Router,
    public databaseHandlerService: DatabaseHandlerService
  ){}


  ngOnInit(): void {
      this.sidebarService.open;

      setTimeout(()=>{
        this.userPageText = this.personaleGetterService.personale;
        this.userArchivePageText = this.personaleGetterService.personaleArchive;

        console.log("Normal users",this.userPageText);
        console.log("Archive users",this.userArchivePageText)

        this.isDataReady = true;
      }, 2000)

  }

  getMaxLength():number {
    return Math.max(this.userPageText?.length || 0, this.userArchivePageText?.length || 0);
  }

  getRange(length:number): number[] {
    return Array.from({ length }, (_, i)=> i)
  }

  reDirectToEdit(index: number, dataSet: string):void{



    if (dataSet == "userPageText"){
      this.trueDataSet = "Personale";
    }
    else if (dataSet == "userArchivePageText"){
      this.trueDataSet = "PersonaleSTORAGE";
    }
    const queryParams = {
      index: index,
      dataSet: this.trueDataSet
    }

    console.log(queryParams);

    this.router.navigate(['/Admin-Edit'], {queryParams});
  }
  deleteEntry(index: number, dataSet: string, Username: string):void{
    console.log("Deleting!");
    alert("Er du sikker på du vil slette denne bruger fra systemet?");
    if (confirm("Er du sikker på du vil slette denne bruger fra systemet?")){
          this.databaseHandlerService.GetID(Username,dataSet).subscribe(
            (response)=>{
              if (response && response.ID){
                this.trueID = response.ID;
                console.log("ID:",this.trueID);
                this.correctedID = Number(this.trueID)-1;
                console.log("Corrected ID:", this.correctedID);
                if (dataSet == "Personale"){
                  this.databaseHandlerService.deleteDatabase(this.correctedID,dataSet).subscribe(
                    (response)=>{
                      console.log("User Removed", response);
                    },
                    (error)=>{
                      console.error("Error:", error);
                    }
                  );
                }
                else if (dataSet=="PersonaleSTORAGE"){
                  this.databaseHandlerService.deleteDatabase(this.correctedID,dataSet).subscribe(
                    (response)=>{
                      console.log("User Removed", response)
                    },
                    (error)=>{
                      console.error("Error:", error);
                    }
                  );
                }
                else {
                  console.log("Error. dataset does exist in database");
                }
              }
            },
            (error)=> {
              console.error("Error:",error);
            }
          )
      }
      else {
        console.log("Deletion Aborted");
      }

  }
  moveUser(index: number, dataSet: string, moveset: string, Data: string): void {
  console.log("Running MoveUser");
  console.log("Data:", Data, "DataSet:", dataSet);

  this.databaseHandlerService.GetID(Data, dataSet).subscribe(
    (response) => {
      if (response && response.ID){
      console.log('Grabbed ID', response);
      this.trueID = response.ID; // Assuming the server response contains an `ID` field
      const dataToMove = {
        DataSet: dataSet,
        ID: Number(this.trueID)-1
      };
      console.log("Data to move:",dataToMove);

      if (moveset === "Store") {
        this.databaseHandlerService.StoreDatabse(dataToMove.ID, dataToMove.DataSet,Data).subscribe(
          (storeResponse) => { console.log('User Moved', storeResponse); },
          (storeError) => { console.log('Error', storeError); }
        );
      } else if (moveset === "Retrive") {
        this.databaseHandlerService.RetriveDatabase(dataToMove.ID, dataToMove.DataSet,Data).subscribe(
          (retrieveResponse) => { console.log("User Moved", retrieveResponse); },
          (retrieveError) => { console.log("Error", retrieveError); }
        );
      }
      } else {
        console.error('ID not found in response:', response);
      }
    },
    (error) => {
      console.log('Error', error);
    }
  );
  }
  reDirectToCreate():void{
    this.router.navigate(['/Admin-Create']);
  }

refreshData(): void {
  this.isDataReady = false;
  setTimeout(() => {
    this.personaleGetterService.getPersonaleData().subscribe(
    (data) => {
      this.userPageText = data; // Assign the fetched data
      console.log("Refreshed Normal users: ", this.userPageText);

      // Fetch archived users after normal users are fetched
      this.personaleGetterService.getPersonaleArchiveData().subscribe(
        (archiveData) => {
          this.userArchivePageText = archiveData; // Assign the fetched data
          console.log("Refreshed Archive users: ", this.userArchivePageText);

          // Mark data as ready after both requests are complete
          this.isDataReady = true;
        },
        (archiveError) => {
          console.error("Failed to fetch archived users:", archiveError);
          this.isDataReady = true; // Allow the UI to recover
        }
      );
    },
    (error) => {
      console.error("Failed to fetch normal users:", error);
      this.isDataReady = true; // Allow the UI to recover
    }
  );
  }, 2000);
  // Fetch normal users
}

}
