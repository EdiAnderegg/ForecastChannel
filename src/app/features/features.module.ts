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
import { WeekPipe } from '../shares/pipes/week.pipe';
import { UvIndexPipe } from '../shares/pipes/uv-index.pipe';
import { TemperaturePipe } from '../shares/pipes/temperature.pipe';
import { HighlightDirectiv } from '../shares/directives/highlight.directive';
import { CurrentComponent } from './main/current/current.component';
import { TodayComponent } from './main/today/today.component';
import { TomorrowComponent } from './main/tomorrow/tomorrow.component';
import { WeekComponent } from './main/week/week.component';
import { UvIndexComponent } from './main/uv-index/uv-index.component';
import { RegionComponent } from './settings/region/region.component';
import { SetComponent } from './settings/set/set.component';

@NgModule({
  declarations: [
    StartComponent,
    MainComponent,
    GlobeComponent,
    SettingsComponent,
    WindPipe,
    SpeedPipe,
    WeekPipe,
    UvIndexPipe,
    TemperaturePipe,
    HighlightDirectiv,
    CurrentComponent,
    TodayComponent,
    TomorrowComponent,
    WeekComponent,
    UvIndexComponent,
    RegionComponent,
    SetComponent,
  ],
  imports: [CommonModule, FeaturesRoutingModule, FontAwesomeModule],
  exports: [FeaturesRoutingModule],
})
export class FeaturesModule {}
