import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';
import { DyrGetterService } from '../dyr-getter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dyr-info',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './dyr-info.component.html',
  styleUrl: './dyr-info.component.css'
})
export class DyrInfoComponent implements OnInit {
  public animalID: string = " ";
  isDataReady: boolean = false;
  public dyrPageText!: any;
  public animalsInZoo: string[] = [];
  public dataSet: string = " ";
  isDyrDataSet: boolean = false;
  public dyrArkivPageText!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sidebarService: SidebarService,
    public readonly dyrGetterService: DyrGetterService
  ) {}

   ngOnInit():void {
    this.sidebarService.open();

    this.route.queryParams.subscribe((params) => {
      this.animalID = params['id'];
      console.log('Animal ID:', this.animalID);
      this.dataSet = params['DataSet'];
      console.log('DataSet: ', this.dataSet);
  });
    setTimeout(() => {
      this.dyrPageText = this.dyrGetterService.dyr;
      this.dyrArkivPageText = this.dyrGetterService.dyr_archive;
      this.animalsInZoo = this.dyrGetterService.getAnimalsInZoo();
      this.dataSetLoader();
      this.isDataReady = true;
},1000)
}
  reDirectToEdit():void {
    this.router.navigate(['/Dyr-Info-Edit'], { queryParams: { id: this.animalID, DataSet: this.dataSet } });
  }

  dataSetLoader(): void{
    if (this.dataSet == "Dyr"){
      this.isDyrDataSet = true;
    }
    else {
      this.isDyrDataSet = false;
    }
  }

}
