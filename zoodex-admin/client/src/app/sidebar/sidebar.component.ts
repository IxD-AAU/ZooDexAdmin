import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import { Router } from '@angular/router';
import { PersonaleGetterService } from '../personale-getter.service';
import { CommonModule } from '@angular/common';
import { UsernameGetterService } from '../username-getter.service';
import { isDataView } from 'util/types';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  IsOpen = true;
  public user!: any;
  public userName: string = "";
  userIsAdmin: boolean = false;
  public PageLoaded: string = "";
  public PageHighlight: string = "";

  constructor(
    private sidebarService: SidebarService,
    private readonly usernameGetterService: UsernameGetterService,
    private readonly personaleGetterService: PersonaleGetterService,
    private router: Router
  ){
    this.sidebarService.sidebarState$.subscribe(state =>{
      this.IsOpen = state;
    });


  }
  ngOnInit(): void {
    this.userName = this.usernameGetterService.getUsername();
    this.user = this.personaleGetterService.personale;

    const currentUserIndex = this.user.findIndex((user: any) => user.Username === this.userName);
    this.currentPage();
    console.log('current user index:', currentUserIndex);
    console.log('current user: ',this.userName);
    console.log('all users: ',this.user)
    this.isAdmin(currentUserIndex);

  }
  navigateTo(route: string){
    this.router.navigate([route]);
  }
  isAdmin(userIndex: number):void{
    if (this.user != undefined || this.user != null){
      if (this.user[userIndex].Job == "IT-Support"){
        this.userIsAdmin = true;
      }
      else{
        this.userIsAdmin = false;
      }
    }
    else {
      this.userIsAdmin = false
    }
  }
  currentPage():void{
    this.PageLoaded = this.router.url.split('?')[0].split('#')[0]
    console.log("Current Page:",this.PageLoaded);
    if (this.PageLoaded == "/Dashboard"){
      this.PageHighlight = "Dashboard";
    }
    else if(this.PageLoaded == "/Events" || this.PageLoaded == "/Events-Info" || this.PageLoaded == "/Events-Create"){
      this.PageHighlight = "Events";
    }
    else if(this.PageLoaded == "/Dyr" || this.PageLoaded == "/Dyr_Info" || this.PageLoaded == "/Dyr_Info-Edit" ||this.PageLoaded == "/Dyr-Create"){
      this.PageHighlight = "Dyr";
    }
    else if(this.PageLoaded == "/Admin" || this.PageLoaded=="/Admin-Edit" || this.PageLoaded == "/Admin-Create"){
      this.PageHighlight = "Admin";
    }
    else if(this.PageLoaded == "/Indstillinger"){
      this.PageHighlight = "Indstillinger";
    }
    else if(this.PageLoaded == "/Profile"){
      this.PageHighlight = "Profile";
    }
    else if(this.PageLoaded == "/Kalender"){
      this.PageHighlight = "Kalender";
    }
    else if(this.PageLoaded == "/Personale"){
      this.PageHighlight = "Personale";
    }
    else {
      this.PageHighlight = "null";
    }
  }
}
