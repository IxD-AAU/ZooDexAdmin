import { Component,OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarService } from '../sidebar.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-beskeder',
  imports: [SidebarComponent],
  templateUrl: './beskeder.component.html',
  styleUrl: './beskeder.component.css'
})
export class BeskederComponent {

}
