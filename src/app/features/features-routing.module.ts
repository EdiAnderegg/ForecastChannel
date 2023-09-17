import { GlobeComponent } from './globe/globe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { SettingsComponent } from './settings/settings.component';
import { MainComponent } from './main/main.component';
import { CurrentComponent } from './main/current/current.component';
import { TodayComponent } from './main/today/today.component';
import { TomorrowComponent } from './main/tomorrow/tomorrow.component';

const routes: Routes = [
  {path: 'start', component: StartComponent },
  {path: 'main', component: MainComponent,
   children:[
    {path: '', redirectTo: 'Current', pathMatch: 'full'},
    {path: 'Current', component: CurrentComponent, data: { animation: 0 }},
    {path: 'Today', component: TodayComponent, data: { animation: 1 }},
    {path: 'Tomorrow', component: TomorrowComponent, data: { animation: 2 }}
   ]
  },
  {path: 'settings', component: SettingsComponent },
  {path: 'globe', component: GlobeComponent },
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: '**', component: StartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
