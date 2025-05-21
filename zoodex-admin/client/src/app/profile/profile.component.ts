import { Component,OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarService } from '../sidebar.service';
import { PersonaleGetterService } from '../personale-getter.service';
import { CommonModule } from '@angular/common';
import { UsernameGetterService } from '../username-getter.service';
import { PageText, User} from '../models/personale.model';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  isDataReady: boolean = false;
  public pageText!: any;
  username: string = " ";
  public UserID!: number;
  public ProfileData!: number;


  constructor(
    public sidebarService: SidebarService,
    public readonly personaleGetterService: PersonaleGetterService,
    public usernameGetterService: UsernameGetterService
  ) { }

  ngOnInit(): void {
    this.sidebarService.open();
    setTimeout(() => {
      this.pageText = this.personaleGetterService.personale
      this.username = this.usernameGetterService.getUsername();
      this.isDataReady = true;
      this.ProfileData = this.getProfileData();
      this.UserID = this.getUserData()+1;
    }, 1000);
  }

  getProfileData(): any{
    let i = 0;
    while (i <= (this.pageText).length) {
      if (this.pageText[i].Username == this.username) {
        return i;
      }
      else {
        i++;
      }
    }

  }



  getUserData(): any {
    let i = 0;
    while (i <= (this.pageText).length) {
      if (this.pageText[i].Username == this.username) {
        return i;
      }
      else {
        i++;
      }
    }
    }
  }



