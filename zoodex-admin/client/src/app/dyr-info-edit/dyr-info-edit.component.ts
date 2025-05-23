import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DyrGetterService } from '../dyr-getter.service';
import { FormsModule } from '@angular/forms';
import { DatabaseHandlerService } from '../database-handler.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dyr-info-edit',
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './dyr-info-edit.component.html',
  styleUrl: './dyr-info-edit.component.css'
})
export class DyrInfoEditComponent implements OnInit {

  public animalID: number = 0;
  isDataReady: boolean = false;
  public dyrPageText!: any;
  public dyrArkivPageText!: any;
  public DataSet: string = " ";
  isDyrData: boolean = false;

  constructor(
    private router: Router,
    public sidebarService: SidebarService,
    private route: ActivatedRoute,
    public dyrGetterService: DyrGetterService,
    public databaseHandlerService: DatabaseHandlerService
  ) { }

  ngOnInit(): void {
    this.sidebarService.open();
    this.route.queryParams.subscribe((params) => {
      this.animalID = params['id'];
      console.log('Animal ID:', this.animalID);
      this.DataSet = params['DataSet'];
    });
    setTimeout(() => {
      this.dyrPageText = this.dyrGetterService.dyr;
      this.dyrArkivPageText = this.dyrGetterService.dyr_archive;
      if(this.DataSet == "Dyr"){
        this.isDyrData = true;
      }
      else {
        this.isDyrData = false;
      }
      this.isDataReady = true;
    }, 1000);
  }
  submitForm(): void {
    console.log(this.dyrPageText[this.animalID], 'is the data to be sent to the database');
    if(this.DataSet=="Dyr"){
      const dataToSend = this.dyrPageText[this.animalID];
      const dataSet = this.DataSet;
      this.databaseHandlerService.updateDatabase(this.animalID,dataToSend,dataSet).subscribe({
        next: (response) => {
          console.log("Data updated successfully:", response);
          alert("Data opdateret!");
        },
        error: (error) => {
          console.error("Error updating data:", error);
          alert("Der skete en fejl under opdateringen af data.");
        }
      });
    }
    else if(this.DataSet == "DyrSTORAGE") {
      const dataToSend = this.dyrArkivPageText[this.animalID];
      this.databaseHandlerService.updateDatabase(this.animalID,dataToSend,this.DataSet).subscribe({
        next: (response) => {
          console.log("Data updated successfully", response);
          alert("Data opdateret!");
        },
        error: (error) => {
          console.log("Error updating data:", error);
          alert("Der skete en fejl under opdateringen af data.");
        }
      })
    }
  }
  deleteData(): void {
    alert("Er du sikker på at du vil slette dyret?");
    if (confirm("Er du sikker på at du vil slette dyret?")) {
      const dataSet = "Dyr";
      this.databaseHandlerService.deleteDatabase(this.animalID, dataSet).subscribe({
        next: (response) => {
          console.log("Data deleted successfully:", response);
          alert("Data slettet!");
        },
        error: (error) => {
          console.error("Error deleting data:", error);
          alert("Der skete en fejl under sletning af dataene.");
        }
      })
    }
    else {
      console.log("Sletning afbrudt");
    }
  }
  moveData(): void {
    alert("Er du sikker på at du vil flytte dyret til arkivet?");
    if (confirm("Er du sikker på at du vil flytte dyret til arkivet?")) {
      const dataSet = "Dyr";
      this.databaseHandlerService.StoreDatabase(this.animalID, dataSet,this.dyrPageText[this.animalID].Name).subscribe({
        next: (response) => {
          console.log("Data moved successfully:", response);
          alert("Data flyttet til arkivet!");
        },
        error: (error) => {
          console.error("Error moving data:", error);
          alert("Der skete en fejl under flytning af dataene.");
        }
      })
    }
    else {
      console.log("Flytning afbrudt");
    }

  }
  retriveData(): void {
    alert("Er du sikker på at du vil hente dyret fra akrivet?");
    if (confirm("Er du sikker på at du vil hente dyret fra akrivet?")) {
      const dataSet = "Dyr";
      this.databaseHandlerService.RetriveDatabase(this.animalID, dataSet,this.dyrArkivPageText[this.animalID].Name).subscribe({
        next: (response) => {
          console.log("Data retrieved successfully:", response);
          alert("Data hentet fra arkivet!");
        },
        error: (error) => {
          console.error("Error retrieving data:", error);
          alert("Der skete en fejl under hentning af dataene.");
        }
      })
    }
    else {
      console.log("Hentning afbrudt");
    }
  }
  reDirectToInfo(): void {
    console.log("reDirecting to info page");
    this.router.navigate(['/Dyr_Info'], { queryParams: { id: this.animalID, DataSet: this.DataSet} });
  }
}
