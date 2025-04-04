import { Routes } from '@angular/router';
import { PersonaleComponent } from './personale/personale.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'Personale', component: PersonaleComponent},
  { path: ' Dashboard', component: DashboardComponent},
  { path: '', component: LoginComponent},

];
