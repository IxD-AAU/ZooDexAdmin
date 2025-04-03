import { Routes } from '@angular/router';
import { PersonaleComponent } from './personale/personale.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'Personale', component: PersonaleComponent},
  { path: '', component: LoginComponent},

];
