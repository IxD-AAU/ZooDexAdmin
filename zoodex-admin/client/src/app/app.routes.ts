import { RouterModule, Routes } from '@angular/router';
import { PersonaleComponent } from './personale/personale.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { DyrComponent } from './dyr/dyr.component';
import { KalenderComponent } from './kalender/kalender.component';
import { BeskederComponent } from './beskeder/beskeder.component';
import { IndstillingerComponent } from './indstillinger/indstillinger.component';
import { ProfileComponent } from './profile/profile.component';
import { DyrInfoComponent } from './dyr-info/dyr-info.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'Dashboard', component: DashboardComponent},
  { path: 'Events', component: EventsComponent},
  { path: 'Dyr', component: DyrComponent},
  { path: 'Kalender', component: KalenderComponent},
  { path: 'Personale', component: PersonaleComponent},
  { path: 'Beskeder', component: BeskederComponent},
  { path: 'Indstillinger', component: IndstillingerComponent},
  { path: 'Profile', component: ProfileComponent},
  { path: 'Dyr_Info', component: DyrInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
