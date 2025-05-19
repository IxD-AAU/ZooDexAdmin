import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar.service';
import { PersonaleGetterService } from '../personale-getter.service';
import { CommonModule, ɵnormalizeQueryParams } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';


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

  constructor(
    public sidebarService: SidebarService,
    private readonly personaleGetterService: PersonaleGetterService,
    public router: Router
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
  deleteEntry(){}
  reDirectToCreate():void{
    this.router.navigate(['/Admin-Create']);
  }
}
