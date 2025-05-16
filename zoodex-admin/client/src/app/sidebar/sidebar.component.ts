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
    console.log('current user index:', currentUserIndex);
    console.log('current user: ',this.userName);
    console.log('all users: ',this.user)
    this.isAdmin(currentUserIndex);

  }
  navigateTo(route: string){
    this.router.navigate([route]);
  }
  isAdmin(userIndex: number):void{
    if (this.user[userIndex].Job == "IT-Support"){
      this.userIsAdmin = true;
    }
    else{
      this.userIsAdmin = false;
    }
  }
}
