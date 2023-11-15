import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { UvIndexService } from 'src/app/shares/services/uv-index.service';
import { IconService } from 'src/app/shares/services/icon.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';
import { SoundService } from './sound.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class MotherService {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly iconService: IconService,
    private readonly sessionDataService: SessionDataService,
    private readonly uvService: UvIndexService,
    private readonly soundService: SoundService,
    private readonly loadingService: LoadingService
  ) {}

  initializeApp(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.sessionDataService.outputUser({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          tempUnit: 'metric',
          windSpeed: 'km/h',
          location: '',
        });
      });
    }
  }
  initializeStart(): void {
    this.loadingService.setLoadingCurrent(false);
    this.loadingService.setLoadingBackgroundSound(false);
    this.loadingService.setLoadingEventSound(false);

    this.sessionDataService
      .getUser$()
      .pipe(take(1))
      .subscribe((user) => {
        this.weatherService.setWeather(user);
        this.uvService.setUV(user?.lat!, user?.lon!);
      });

    this.weatherService
      .getCurrentWeather$()
      .pipe(take(1))
      .subscribe((data) => {
        const current = { ...data[0] };
        current.icon = this.iconService.getIcon(current.description);
        this.sessionDataService.outputCurrent(current);

        this.sessionDataService.outputUser({ location: data[0].location });

        this.loadingService.setLoadingCurrent(true);
      });

    //Sounds in StartComponent

    //BackgroundSound
    this.soundService.enableAutoplay();
    this.soundService
      .preload(
        'start_component',
        'assets/sound/background_sound/01_forecast_channel_banner.mp3'
      )
      .pipe(take(1))
      .subscribe(() => {
        this.soundService.playSound('start_component');
        this.loadingService.setLoadingBackgroundSound(true);
      });

    //EventSounds
    this.soundService
      .preload('start_button', 'assets/sound/event_sound/start_button.ogg')
      .pipe(take(1))
      .subscribe(() => {
        this.loadingService.setLoadingEventSound(true);
      });
  }

  initializeMain(): void {
    this.loadingService.setLoadingCurrent(false);
    this.loadingService.setLoadingWeek(false);
    this.loadingService.setLoadingUv(false);
    this.loadingService.setLoadingBackgroundSound(false);

    this.sessionDataService
      .getUser$()
      .pipe(take(1))
      .subscribe((user) => {
        this.weatherService.setWeather(user);
        this.uvService.setUV(user?.lat!, user?.lon!);
      });

    this.weatherService
      .getCurrentWeather$()
      .pipe(take(1))
      .subscribe((data) => {
        const current = { ...data[0] };
        current.icon = this.iconService.getIcon(current.description);
        this.sessionDataService.outputCurrent(current);

        this.sessionDataService.outputUser({ location: data[0].location });

        const today = { ...data[1] };
        today.icon = this.iconService.getIcon(today.description);
        this.sessionDataService.outputToday(today);

        this.loadingService.setLoadingCurrent(true);
      });

    this.weatherService
      .getWeekWeather$()
      .pipe(take(1))
      .subscribe((data) => {
        const tomorrow = { ...data[0] };
        tomorrow.icon = this.iconService.getIcon(tomorrow.description);
        this.sessionDataService.outputTomorrow(tomorrow);

        const week = { ...data[1] };
        for (let i = 0; i <= 4; i++) {
          week.days[i].icon = this.iconService.getIcon(
            week.days[i].description
          );
        }
        this.sessionDataService.outputWeek(week);
        this.loadingService.setLoadingWeek(true);
      });

    this.uvService
      .getUV$()
      .pipe(take(1))
      .subscribe((data) => {
        const uv = { ...data };
        this.sessionDataService.outputUv(uv);
        this.loadingService.setLoadingUv(true);
      });

    //Sounds in MainComponent

    //BackgroundSound
    if (this.loadingService.playingBackgroundSound) {
      this.loadingService.setLoadingBackgroundSound(true);
      return;
    }
    this.soundService.enableAutoplay();
    this.soundService
      .preload(
        'main_component',
        'assets/sound/background_sound/04_Local_Forecast_(Daytime).mp3'
      )
      .pipe(take(1))
      .subscribe(() => {
        this.soundService.playSound('main_component');
        this.loadingService.playingBackgroundSound = true;
        this.loadingService.setLoadingBackgroundSound(true);
      });
  }

  initializeSettings(): void {
    this.loadingService.setLoadingUser(false);
    this.sessionDataService
      .getUser$()
      .pipe(take(1))
      .subscribe((data) => {
        const location = {
          country: '',
          city: data?.location!,
          lat: data?.lat!,
          lon: data?.lon!,
        };
        this.sessionDataService.outputLocation(location);
        setTimeout(() => {
          this.loadingService.setLoadingUser(true);
        }, 0);
      });
  }
}
