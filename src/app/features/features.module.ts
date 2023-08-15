import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { MainComponent } from './main/main.component';
import { GlobeComponent } from './globe/globe.component';
import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [
    StartComponent,
    MainComponent,
    GlobeComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule
  ],
  exports:[
    FeaturesRoutingModule
  ],
})
export class FeaturesModule { }
