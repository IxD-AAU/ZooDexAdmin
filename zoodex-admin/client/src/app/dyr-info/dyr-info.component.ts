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
  });
    setTimeout(() => {
      this.dyrPageText = this.dyrGetterService.dyr;
      this.animalsInZoo = this.dyrGetterService.getAnimalsInZoo();
      this.isDataReady = true;
})
}
  reDirectToEdit():void {
    this.router.navigate(['/Dyr-Info-Edit'], { queryParams: { id: this.animalID } });
  }

}
