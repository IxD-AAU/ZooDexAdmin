import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarService } from '../sidebar.service';
import { PersonaleGetterService } from '../personale-getter.service';


@Component({
  selector: 'app-personale',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './personale.component.html',
  styleUrl: './personale.component.css'
})
export class PersonaleComponent implements OnInit {

  isDataReady: boolean = false;
  public pageText!: any;

  constructor(public sidebarService: SidebarService,
    public readonly personaleGetterService: PersonaleGetterService
  ){ }

  ngOnInit(): void {
      this.sidebarService.open();

    setTimeout(() => {
      this.pageText = this.personaleGetterService.personale;
      this.isDataReady = true;
      console.log(this.pageText);
    }, 1000);


  }
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
