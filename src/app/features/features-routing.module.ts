import { GlobeComponent } from './globe/globe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { SettingsComponent } from './settings/settings.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: 'start', component: StartComponent },
  {path: 'main', component: MainComponent },
  {path: 'settings', component: SettingsComponent },
  {path: 'globe', component: GlobeComponent },
  {path: '', redirectTo: '/start', pathMatch: 'full'},
  {path: '**', component: StartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
