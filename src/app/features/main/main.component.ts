import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Weather } from 'src/app/shares/interfaces/weather.interface';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { MainService } from 'src/app/shares/services/main.service';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { slider } from 'src/app/shares/animation/slide.animation';
import { fadeInAnimation } from 'src/app/shares/animation/fade-in.animation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [slider, fadeInAnimation],
})
export class MainComponent implements OnInit, AfterViewInit {
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  public Weather$!: Observable<Weather | undefined>;
  public actualSite: string[] = [
    '',
    'UV Index',
    'Current',
    'Today',
    'Tomorrow',
    '5-Day Forecast',
    '',
  ];
  public urlTitle: string | undefined = '';
  public currentIndex: number = 1;
  public textLength: boolean = false;
  public display: boolean = true;
  public initialized: boolean = false;

  constructor(
    private readonly mainService: MainService,
    private readonly sessionDataService: SessionDataService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.urlTitle = this.router.url.split('/').pop();
    this.mainService.initializeData();
    this.handleUrlTitle();
    this.initialized = true;
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  private handleUrlTitle(): void {
    switch (this.urlTitle) {
      case 'Current':
        this.Weather$ = this.sessionDataService.getCurrent$();
        if (!this.initialized) {
          this.currentIndex = 2;
        }
        return;
      case 'Today':
        this.Weather$ = this.sessionDataService.getToday$();
        if (!this.initialized) {
          this.currentIndex = 3;
        }
        return;
      case 'Tomorrow':
        this.Weather$ = this.sessionDataService.getTomorrow$();
        if (!this.initialized) {
          this.currentIndex = 4;
        }
        return;
      case '5-Day_Forecast':
        this.Weather$ = this.sessionDataService.getWeek$();
        if (!this.initialized) {
          this.currentIndex = 5;
        }
        this.textLength = true;
        return;
      case 'UV_Index':
        this.Weather$ = this.sessionDataService.getCurrent$();
        if (!this.initialized) {
          this.currentIndex = 1;
        }
        return;
    }
  }

  private ctrlLongTitle(url: string) {
    if (url === 'main/5-Day_Forecast') {
      this.textLength = true;
      return;
    }
    this.textLength = false;
  }

  public prepareRoute(outlet: RouterOutlet): any {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  public disableDisplay(): void {
    this.display = false;
    setTimeout(() => {
      this.display = true;
    }, 1);
  }

  public btnstart(): void {
    this.router.navigateByUrl('/start');
  }

  public btnSettings(): void {
    this.router.navigateByUrl('/settings');
  }

  public btnSlide(increment: number): void {
    const newIndex = this.currentIndex + increment;
    if (newIndex >= 1 && newIndex < this.actualSite.length) {
      this.currentIndex = newIndex;
      // Only set the router URL once
      this.urlTitle = this.actualSite[newIndex].split(' ').join('_');
      const newRoute = `main/${this.urlTitle}`;
      this.ctrlLongTitle(newRoute);
      this.router.navigateByUrl(newRoute);
      this.handleUrlTitle();
    }
    this.disableDisplay();
  }

  public isButtonDisabled(index: number): boolean {
    return index === 0 || index === this.actualSite.length - 1;
  }
}
