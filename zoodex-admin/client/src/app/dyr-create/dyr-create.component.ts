import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-dyr-create',
  imports: [SidebarComponent],
  templateUrl: './dyr-create.component.html',
  styleUrl: './dyr-create.component.css'
})
export class DyrCreateComponent implements OnInit{

  constructor(
    public sidebarService: SidebarService
  ){}

  ngOnInit(): void {
    this.sidebarService.open
  }
}

