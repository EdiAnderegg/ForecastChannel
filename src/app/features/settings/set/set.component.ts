import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MotherService } from 'src/app/shares/services/main.service';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { LoadingService } from 'src/app/shares/services/loading.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shares/interfaces/user.interface';
import { fadeOutScreen } from 'src/app/shares/animation/loading.animation';
//import { Location } from 'src/app/shares/interfaces/location.interface';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
  animations: [fadeOutScreen],
})
export class SetComponent implements OnInit {
  public loadingSet$!: Observable<boolean>;
  public User$!: Observable<User | Partial<User> | undefined>;

  public measure: string = 'metric';
  public speed: string = 'km/h';

  constructor(
    private readonly motherService: MotherService,
    private readonly previousRouteService: PreviousRouteService,
    private readonly loadingService: LoadingService,
    private readonly sessionDataService: SessionDataService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) {}

  public getBack() {
    /*this.sessionDataService.outputUser({
      lat: this.location?.lat!,
      lon: this.location?.lon!,
      tempUnit: this.measure,
      windSpeed: this.speed,
      location: this.location?.city!,
    });
     this.weatherService.setWeather(
      this.location?.lat!,
      this.location?.lon!,
      this.measure,
      this.speed,
      this.location?.city!
    );
    this.uvIndexService.setUV(this.location?.lat!, this.location?.lon!);*/
    this.router.navigateByUrl(this.previousRouteService.getPreviousUrl());
  }

  public changeLocation() {
    this.loadingService.weatherChanged = true;
    this.router.navigateByUrl('settings/region');
  }

  public changeTemp() {
    this.loadingService.weatherChanged = true;
    if (this.measure === 'metric') return (this.measure = 'imperial');
    return (this.measure = 'metric');
  }

  public changeSpeed() {
    this.loadingService.weatherChanged = true;
    if (this.speed === 'km/h') return (this.speed = 'mph');
    return (this.speed = 'km/h');
  }

  ngOnInit(): void {
    this.motherService.initializeSettings();
    this.User$ = this.sessionDataService.getUser$();
  }

  ngAfterViewInit(): void {
    this.loadingSet$ = this.loadingService.getLoadingSettings();
    this.cd.detectChanges();
  }
}
