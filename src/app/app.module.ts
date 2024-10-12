import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeaturesModule } from './features/features.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OptionsComponent } from './options/options.component';

@NgModule({ declarations: [AppComponent, OptionsComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        NgbModule,
        ReactiveFormsModule,
        FeaturesModule,
        FontAwesomeModule,
        ModalModule.forRoot()], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
  constructor() {}
}
