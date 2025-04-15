import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsernameGetterService } from '../username-getter.service';
import { Router } from '@angular/router';
import { PersonaleGetterService } from '../personale-getter.service';
import { CommonModule } from '@angular/common';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent implements OnInit {
  public pageText!: any;
  Username: string = '';
  Password: string = '';
  public UserID!: string;
  public PasswordCheck!: any;
  public PasswordHolder!: string;

  constructor(
    private usernameGetterService: UsernameGetterService,
    private router: Router,
    private readonly personaleGetterService: PersonaleGetterService
  ) { }

  ngOnInit(): void {
    this.PasswordCheck = this.personaleGetterService.personale;
  }

  handleSubmit(){
    console.log(this.Username, 'logged in with', this.Password);
    for (const userId in this.PasswordCheck.PERSONALE) {
      if (this.PasswordCheck.PERSONALE[userId].Login === this.Username) {
        this.UserID = userId;
        break;
      }
    }
      this.PasswordHolder = String(this.PasswordCheck.PERSONALE[this.UserID].Password);
      console.log(this.PasswordHolder, 'is the password for', this.Username);

      if (this.Password == this.PasswordHolder) {
        this.usernameGetterService.setUsername(this.Username);
        this.router.navigate(['/Dashboard']);
        //window.location.href = '/Dashboard';
      }
      else{
        alert('Fejl: Brugernavn eller password forkert, hvis de har glemt deres brugernavn eller password, kontakt IT afdeling for hjælp');
      }
    }
  }
