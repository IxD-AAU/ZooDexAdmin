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
import { DyrInfoEditComponent } from './dyr-info-edit/dyr-info-edit.component';
import { EventsInfoComponent } from './events-info/events-info.component';
import { EventsCreateComponent } from './events-create/events-create.component';
import { DyrCreateComponent } from './dyr-create/dyr-create.component';

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
  { path: 'Dyr_Info', component: DyrInfoComponent},
  { path: 'Dyr-Info-Edit', component: DyrInfoEditComponent},
  { path: 'Events-Info', component: EventsInfoComponent},
  { path: 'Events-Create', component: EventsCreateComponent},
  { path: 'Dyr-Create', component: DyrCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
