import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shares/interfaces/user.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private readonly previousRouteService: PreviousRouteService,
              private readonly weatherService: WeatherService,
              private readonly router: Router
              ) {}

  public getBack(){
    this.router.navigateByUrl(this.previousRouteService.getPreviousUrl());
  }
  ngOnInit(): void {
  }

}
