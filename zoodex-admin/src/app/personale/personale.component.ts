import { Component,OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarService } from '../sidebar.service';
import { PersonaleGetterService } from '../personale-getter.service';


@Component({
  selector: 'app-personale',
  imports: [SidebarComponent],
  templateUrl: './personale.component.html',
  styleUrl: './personale.component.css'
})


export class PersonaleComponent implements OnInit {
  isDataReady: boolean = false;
  public pageText!: any;

  constructor(public sidebarService: SidebarService, public readonly personaleGetterService: PersonaleGetterService){ }

  ngOnInit(): void {
      this.sidebarService.open();
      this.pageText = this.personaleGetterService.personale;
      console.log(this.pageText);
  }
}
