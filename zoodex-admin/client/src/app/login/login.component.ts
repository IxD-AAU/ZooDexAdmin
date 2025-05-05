import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsernameGetterService } from '../username-getter.service';
import { Router } from '@angular/router';
import { PersonaleGetterService } from '../personale-getter.service';
import { CommonModule } from '@angular/common';
import { stringify } from 'querystring';
import { DyrGetterService } from '../dyr-getter.service';

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
  public UserID!: number;
  public PasswordCheck!: any;
  public PasswordHolder!: string;
  private PasswordCheckLength!: number;
  public dyrPageText!: any;

  constructor(
    private usernameGetterService: UsernameGetterService,
    private router: Router,
    private readonly personaleGetterService: PersonaleGetterService,
    private readonly dyrGetterService: DyrGetterService
  ) { }

  ngOnInit(): void {
    this.PasswordCheck = this.personaleGetterService.personale;
    console.log(this.PasswordCheck);
    this.PasswordCheckLength = this.PasswordCheck.length;
    console.log(this.PasswordCheckLength, 'is the length of the password check array');
    this.dyrPageText = this.dyrGetterService.dyr;
    console.log(this.dyrPageText, 'is the dyrPageText');
  }

  handleSubmit(){
    console.log(this.Username, 'logged in with', this.Password);
    let i = 0;
    while (i < this.PasswordCheckLength) {
      if (this.Username == this.PasswordCheck[i].Username){
        this.UserID = i;
        break;
      }
      else {
        i++;
      }
    }

      this.PasswordHolder = this.PasswordCheck[this.UserID].Password;
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
