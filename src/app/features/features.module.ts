import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { MainComponent } from './main/main.component';
import { GlobeComponent } from './globe/globe.component';
import { SettingsComponent } from './settings/settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WindPipe } from '../shares/pipes/wind.pipe';
import { SpeedPipe } from '../shares/pipes/speed.pipe';
import { CurrentComponent } from './main/current/current.component';
import { TodayComponent } from './main/today/today.component';
import { TomorrowComponent } from './main/tomorrow/tomorrow.component';
import { FadeInElDirective } from 'src/app/shares/directives/fade-in-el.directive';






@NgModule({
  declarations: [
    StartComponent,
    MainComponent,
    GlobeComponent,
    SettingsComponent,
    WindPipe,
    SpeedPipe,
    CurrentComponent,
    TodayComponent,
    TomorrowComponent,
    FadeInElDirective
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    FontAwesomeModule
  ],
  exports:[
    FeaturesRoutingModule
  ],
})
export class FeaturesModule { }
