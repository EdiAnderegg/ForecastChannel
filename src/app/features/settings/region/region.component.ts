import { Observable } from 'rxjs';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Location } from 'src/app/shares/interfaces/location.interface';
import { MotherService } from 'src/app/shares/services/main.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { fadeOutScreen } from 'src/app/shares/animation/loading.animation';
import { LoadingService } from 'src/app/shares/services/loading.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss'],
  animations: [fadeOutScreen],
})
export class RegionComponent implements OnInit, AfterViewInit {
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  public List$!: Observable<Location[] | undefined>;
  public loadingLocation$!: Observable<boolean>;

  private length: number = 20;
  public currentIndex: number = 4;
  public display: boolean = true;
  public location: Location | undefined;
  private height: number = 0;

  constructor(
    private readonly router: Router,
    private readonly loadingService: LoadingService,
    private readonly sessionDataService: SessionDataService,
    private readonly motherService: MotherService,
    private readonly cd: ChangeDetectorRef
  ) {}

  public getBack() {
    this.router.navigateByUrl('/settings');
  }

  public selectAgain() {
    this.currentIndex = 4;
    this.height = 0;
    this.display = true;
  }

  public selectLocation(location: Location): void {
    this.location = location;
    this.display = false;
  }

  public btnLocation(): void {
    this.sessionDataService.outputPartialUser({
      lat: this.location?.lat!,
      lon: this.location?.lon!,
      location: this.location?.city!,
    });
    this.router.navigateByUrl('/settings');
  }

  public btnSlide(
    increment: number,
    idparentElement: string,
    idChildElement: string
  ) {
    const newIndex = this.currentIndex + increment;
    if (newIndex >= 4 && newIndex < this.length) {
      this.currentIndex = newIndex;
    }
    this.scroll(increment, idparentElement, idChildElement);
  }

  private scroll(
    increment: number,
    idparentElement: string,
    idChildElement: string
  ): void {
    const list = document.getElementById(idparentElement);
    const value = document.getElementById(idChildElement);

    if (this.height < 0) {
      this.height = 0;
      return;
    }

    if (this)
      if (increment === 1) {
        list?.scrollTo({
          top: (this.height += value!.getBoundingClientRect().height),
          left: 0,
          behavior: 'smooth',
        });
      } else {
        list?.scrollTo({
          top: (this.height -= value!.getBoundingClientRect().height),
          left: 0,
          behavior: 'smooth',
        });
      }
  }

  public isButtonDisabled(index: number): boolean {
    if (this.length === undefined) return false;
    if (index === 3 || index === this.length) return true;
    return false;
  }

  ngOnInit(): void {
    this.motherService.initializeLocation(this.length);
    this.List$ = this.sessionDataService.getListofLocations$();
  }

  ngAfterViewInit(): void {
    this.loadingLocation$ = this.loadingService.getLoadingLocationList();
    this.cd.detectChanges();
  }
}
