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
  public ProfileData!: number;
  pageTextLength: number = 0;


  constructor(
    public sidebarService: SidebarService,
    public readonly personaleGetterService: PersonaleGetterService,
    public usernameGetterService: UsernameGetterService
  ) { }

  ngOnInit(): void {
    this.sidebarService.open();
    this.pageText = this.personaleGetterService.personale;
    let n = true;
    let i = 0;
    while (n){
      if(this.pageText[i].FirstName != null && this.pageText[i].FirstName != undefined){
        this.pageTextLength++;
        i++;
      }
      else{
        n = false;
      }
    }
    console.log(this.pageTextLength, "is the length of the page text array.");


    setTimeout(() => {
      this.username = this.usernameGetterService.getUsername();
      this.isDataReady = true;

      let profileData = this.getProfileData();
      if (profileData !== null || profileData !== undefined) {
        this.ProfileData = profileData;
        console.log(this.ProfileData);
        console.log(profileData);
        console.log("Profile Data:", this.ProfileData);
      } else {
        console.log("Profile data not found.");
      }

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

  getProfileData(): any{
    let i = 0;
    while (i <= this.pageTextLength) {
      if (this.pageText[i].Firstname == this.username) {
        return i;
      }
      else {
        i++;
      }
    }

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



