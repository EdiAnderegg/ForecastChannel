import { GlobeComponent } from './globe/globe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { SettingsComponent } from './settings/settings.component';
import { MainComponent } from './main/main.component';
import { CurrentComponent } from './main/current/current.component';
import { TodayComponent } from './main/today/today.component';
import { TomorrowComponent } from './main/tomorrow/tomorrow.component';
import { WeekComponent } from './main/week/week.component';
import { UvIndexComponent } from './main/uv-index/uv-index.component';


const routes: Routes = [
  {path: 'start', component: StartComponent },
  {path: 'main', component: MainComponent,
   children:[
    {path: '', redirectTo: 'Current', pathMatch: 'full'},
    {path: 'UV-Index', component: UvIndexComponent, data: { animation: 0}},
    {path: 'Current', component: CurrentComponent, data: { animation: 1 }},
    {path: 'Today', component: TodayComponent, data: { animation: 2 }},
    {path: 'Tomorrow', component: TomorrowComponent, data: { animation: 3 }},
    {path: '5-Day.Forecast', component: WeekComponent, data: { animation: 4 }},
    {path: '**', component: CurrentComponent}
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
