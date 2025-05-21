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
  public dyrPageText!: any;
  public dyrData!: string;
  public dyrArkiv!: any;
  public animalsInZoo: string[] = [];

  constructor(
    public sidebarService: SidebarService,
    private router: Router,
    public readonly dyrGetterService: DyrGetterService
  ) { }

  ngOnInit(): void {
    this.sidebarService.open();

    setTimeout(() => {
      this.dyrPageText = this.dyrGetterService.dyr;
      this.dyrArkiv = this.dyrGetterService.dyr_archive;
      this.isDataReady = true;
      console.log(this.dyrPageText);
      console.log(this.dyrArkiv);


    }, 1500);
  }
  CreateNewDyr(): void{
    this.router.navigate(['/Dyr-Create']);
  }


}
