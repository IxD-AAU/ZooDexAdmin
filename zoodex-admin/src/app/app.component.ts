import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Zoodex Admin Service';
  constructor(public sidebarService: SidebarService) {}
}
