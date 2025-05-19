import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarService } from '../sidebar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseHandlerService } from '../database-handler.service';
import { PersonaleGetterService } from '../personale-getter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-edit',
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.css'
})
export class AdminEditComponent implements OnInit{
  userInfo: any;
  pageText!: any;
  truePageText!: any;
  isDataReady: boolean = false;

  constructor(
    public sidebarService: SidebarService,
    private route: ActivatedRoute,
    public router: Router,
    public databaseHandlerService: DatabaseHandlerService,
    private readonly personaleGetterService: PersonaleGetterService
  ){}

  ngOnInit(): void {
    this.sidebarService.open;

    // Use queryParams observable to fetch userInfo and load data
    this.route.queryParams.pipe(switchMap((params) => {
          this.userInfo = {
            index: params['index'],
            dataSet: params['dataSet']
          };
          console.log("UserInfo:", this.userInfo);

          // Simulate data loading with a delay (replace with actual data fetching logic)
          return of(null).pipe(
            delay(2000), switchMap(()=>{
              this.loadData();
              return of(null);
            })
          );
        })).subscribe(()=>{
          this.isDataReady = true;
          console.log("isDataReady set to true");
        })
  }

      // setTimeout(() => {

      //   if(this.userInfo.dataSet == "Personale"){
      //     this.pageText = this.personaleGetterService.personale;
      //     this.truePageText = this.pageText[this.userInfo.index];
      //   }
      //   else if(this.userInfo.dataSet == "PersonaleSTORAGE"){
      //     this.pageText = this.personaleGetterService.personaleArchive;
      //     this.truePageText = this.pageText[this.userInfo.index];
      //   }
      //   console.log(this.pageText);
      //   console.log(this.truePageText);
      //   if(this.pageText != undefined || this.truePageText != undefined){
      //     this.isDataReady = true;
      //   }
      // }, 3000);


  private loadData():void {
    if (this.userInfo.dataSet === "Personale") {
      this.pageText = this.personaleGetterService.personale
    } else if (this.userInfo.dataSet === "PersonaleSTORAGE") {
      this.pageText = this.personaleGetterService.personaleArchive
    }

    if (this.pageText && this.userInfo.index !== undefined) {
      if (this.pageText[this.userInfo.index]) {
      this.truePageText = this.pageText[this.userInfo.index];
      } else {
        console.error("Invalid index:", this.userInfo.index);
      }
    }
    else {
      console.error("Invalid pageText or index");
    }

    console.log("PageText:",this.pageText);
    console.log("TruePageText:",this.truePageText);
    console.log("Index for usage:",this.userInfo.index);
  }


  submitForm():void{
    console.log("Data to parse: ",this.userInfo.index,this.truePageText,this.userInfo.dataSet);
    this.databaseHandlerService.updateDatabase(this.userInfo.index,this.truePageText,this.userInfo.dataSet).subscribe(
      (response)=>{console.log('User updated', response);},
      (error)=>{console.log('Error', error);}
    );
    this.router.navigate(['/Admin']);
      }
  reDirectBack():void{
    this.router.navigate(['/Admin']);
  }

}
