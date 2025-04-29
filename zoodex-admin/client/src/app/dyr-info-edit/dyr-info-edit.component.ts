import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DyrGetterService } from '../dyr-getter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dyr-info-edit',
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './dyr-info-edit.component.html',
  styleUrl: './dyr-info-edit.component.css'
})
export class DyrInfoEditComponent implements OnInit {
  AnimalName: string = '';
  AnimalType: string = '';
  AnimalDescription: string = '';
  AnimalPersonality: string = '';
  AnimalWeightMaleMin: number = 0;
  AnimalWeightMaleMax: number = 0;
  AnimalWeightFemaleMin: number = 0;
  AnimalWeightFemaleMax: number = 0;
  AnimalHeight: number = 0;
  AnimalSpeed: number = 0;
  AnimalYoungMin: number = 0;
  AnimalYoungMax: number = 0;
  AnimalInZoo: string = 'YES';

  public animalID: string = " ";
  isDataReady: boolean = false;
  public pageText!: any;

  constructor(
    public sidebarService: SidebarService,
    private route: ActivatedRoute,
    public dyrGetterService: DyrGetterService
  ) { }

  ngOnInit(): void {
    this.sidebarService.open();
    this.route.queryParams.subscribe((params) => {
      this.animalID = params['id'];
      console.log('Animal ID:', this.animalID);
    });
    setTimeout(() => {
      this.pageText = this.dyrGetterService.dyr;
      this.isDataReady = true;
    }, 1000);
  }
  submitForm(): void {
    //before implementation, add the database handler function
  }

}
