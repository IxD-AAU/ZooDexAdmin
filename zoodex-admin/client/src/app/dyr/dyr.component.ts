import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';
import { DyrGetterService } from '../dyr-getter.service';
import { Router,RouterModule } from '@angular/router';
import { DyrInfoComponent } from '../dyr-info/dyr-info.component';
@Component({
  selector: 'app-dyr',
  imports: [SidebarComponent, CommonModule, RouterModule],
  templateUrl: './dyr.component.html',
  styleUrl: './dyr.component.css'
})
export class DyrComponent implements OnInit {

  isDataReady: boolean = false;
  public pageText!: any;
  public dyrData!: string;
  public animalsInZoo: string[] = [];

  constructor(
    public sidebarService: SidebarService,
    public readonly dyrGetterService: DyrGetterService
  ) { }

  ngOnInit(): void {
    this.sidebarService.open();

    setTimeout(() => {
      this.pageText = this.dyrGetterService.dyr;
      this.isDataReady = true;
      console.log(this.pageText);


    }, 1000);
  }


}
