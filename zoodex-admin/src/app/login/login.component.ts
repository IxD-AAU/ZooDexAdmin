import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsernameGetterService } from '../username-getter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent {
  Username: string = '';
  Password: string = '';

  constructor(private usernameGetterService: UsernameGetterService, private router: Router) { }

  handleSubmit(){
    console.log(this.Username, 'logged in with', this.Password);
    if (this.Username == "JJENSEN"){
      if (this.Password == "ostemad"){
        this.usernameGetterService.setUsername(this.Username);
        this.router.navigate(['/Dashboard']);
        //window.location.href = '/Dashboard';
      }
      else{
        alert('Fejl: Brugernavn eller password forkert, hvis de har glemt deres brugernavn eller password, kontakt IT afdeling for hjælp');
      }
    }
    else{
      alert('Fejl: Brugernavn eller password forkert, hvis de har glemt deres brugernavn eller password, kontakt IT afdeling for hjælp');
    }
  }
}
