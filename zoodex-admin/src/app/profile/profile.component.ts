import { Component,OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarService } from '../sidebar.service';
import { PersonaleGetterService } from '../personale-getter.service';
import { CommonModule } from '@angular/common';
import { UsernameGetterService } from '../username-getter.service';
import { PageText, User} from '../models/personale.model';

@Component({
  selector: 'app-profile',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  isDataReady: boolean = false;
  public pageText!: PageText;
  username: string = " ";
  public UserID!: string;

  constructor(
    public sidebarService: SidebarService,
    public readonly personaleGetterService: PersonaleGetterService,
    public usernameGetterService: UsernameGetterService
  ) { }

  ngOnInit(): void {
    this.sidebarService.open();

    setTimeout(() => {
      this.username = this.usernameGetterService.getUsername();
      this.pageText = this.personaleGetterService.personale;
      this.isDataReady = true;

      const userData = this.getUserData();
      if (userData) {
        this.UserID = userData.id;
        console.log("User ID:", this.UserID);
      }
      else {
        console.log("User not found in the data.");
      }
    }, 10);
  }

  getUserData(): { id: string; data: User } | null {
    if (!this.pageText?.PERSONALE) {
      return null;
    }

    for (const [key, value] of Object.entries(this.pageText.PERSONALE)) {
      if (value.Login === this.username) {
        return { id: key, data: value };
      }
    }
    return null;
    }
  }



