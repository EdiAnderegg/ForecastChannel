import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MotherService } from 'src/app/shares/services/main.service';
import { PreviousRouteService } from 'src/app/shares/services/previous-route.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { LoadingService } from 'src/app/shares/services/loading.service';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { User } from 'src/app/shares/interfaces/user.interface';
import { fadeOutScreen } from 'src/app/shares/animation/loading.animation';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
  animations: [fadeOutScreen],
})
export class SetComponent implements OnInit, AfterViewInit {
  public loadingSet$!: Observable<boolean>;
  public User$!: Observable<User | undefined>;

  constructor(
    private readonly motherService: MotherService,
    private readonly previousRouteService: PreviousRouteService,
    private readonly loadingService: LoadingService,
    private readonly sessionDataService: SessionDataService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) {}

  public getBack() {
    this.router.navigateByUrl(this.previousRouteService.getPreviousUrl());
  }

  public changeLocation() {
    this.loadingService.weatherChanged = true;
    this.router.navigateByUrl('settings/region');
  }

  public changeTemp() {
    this.loadingService.weatherChanged = true;
    this.User$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.sessionDataService.outputPartialUser({
          tempUnit: user.tempUnit === 'metric' ? 'imperial' : 'metric',
        });
      }
    });
  }

  public changeSpeed() {
    this.loadingService.weatherChanged = true;
    this.User$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.sessionDataService.outputPartialUser({
          windSpeed: user.windSpeed === 'km/h' ? 'mph' : 'km/h',
        });
      }
    });
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
