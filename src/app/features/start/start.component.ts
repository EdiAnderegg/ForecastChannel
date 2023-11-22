import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { MotherService } from 'src/app/shares/services/main.service';
import { SoundService } from 'src/app/shares/services/sound.service';
import { SessionDataService } from './../../shares/services/session-data.service';
import { LoadingService } from 'src/app/shares/services/loading.service';
import { Current } from '../../shares/interfaces/weather.interface';
import { Observable } from 'rxjs';
import { fadeOutScreen } from 'src/app/shares/animation/loading.animation';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  animations: [fadeOutScreen],
})
export class StartComponent implements OnInit, AfterViewInit {
  public loadingStart$!: Observable<boolean>;
  public Current$!: Observable<Current | undefined>;

  constructor(
    private readonly motherService: MotherService,
    private readonly soundService: SoundService,
    private readonly sessionDataService: SessionDataService,
    private readonly loadingService: LoadingService,
    private readonly router: Router,
    private readonly cd: ChangeDetectorRef
  ) {}

  public playSound(sound: string) {
    this.soundService.playSound(sound);
  }
  public btnStart() {
    this.loadingService.playingBackgroundSound = false;
    this.router.navigateByUrl('/main');
  }

  public btnMenu() {
    setTimeout(() => {
      location.reload();
    }, 400);
  }

  ngOnInit(): void {
    this.motherService.initializeStart();
    this.Current$ = this.sessionDataService.getCurrent$();
  }

  ngAfterViewInit(): void {
    this.loadingStart$ = this.loadingService.getLoadingStart();
    this.cd.detectChanges();
  }
}
