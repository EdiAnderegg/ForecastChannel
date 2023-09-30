import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private readonly previousRouteService: PreviousRouteService,
              private readonly router: Router) {}

  public getBack(){
    this.router.navigateByUrl(this.previousRouteService.getPreviousUrl());
  }
  ngOnInit(): void {
  }

}
