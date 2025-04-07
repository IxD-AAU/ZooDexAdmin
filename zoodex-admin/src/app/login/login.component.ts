import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent {
  Username: string = '';
  Password: string = '';


  handleSubmit(){
    console.log(this.Username, 'logged in with', this.Password);
    if (this.Username == "Zoodex"){
      if (this.Password == "ostemad"){
        window.location.href = '/Dashboard';
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
