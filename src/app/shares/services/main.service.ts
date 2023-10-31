import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { WeatherService } from 'src/app/shares/services/weather.service';
import { UvIndexService } from 'src/app/shares/services/uv-index.service';
import { IconService } from 'src/app/shares/services/icon.service';
import { SessionDataService } from 'src/app/shares/services/session-data.service';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly iconService: IconService,
    private readonly sessionDataService: SessionDataService,
    private readonly uvService: UvIndexService
  ) {}

  initializeData(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        if (!this.weatherService.isSet) {
          this.weatherService.setWeather(
            pos.coords.latitude,
            pos.coords.longitude,
            'metric',
            'km/h',
            ''
          );
          this.uvService.setUV(pos.coords.latitude, pos.coords.longitude);
        }

        this.weatherService
          .getCurrentWeather$()
          .pipe(take(1))
          .subscribe((data) => {
            const current = { ...data[0] };
            current.icon = this.iconService.getIcon(current.description);
            this.sessionDataService.outputCurrent(current);

            const today = { ...data[1] };
            today.icon = this.iconService.getIcon(today.description);
            this.sessionDataService.outputToday(today);

            if (!this.weatherService.isSet) {
              this.sessionDataService.outputUser({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
                tempUnit: 'metric',
                windSpeed: 'km/h',
                location: data[0].location,
              });
            }
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
          });

        this.uvService
          .getUV$()
          .pipe(take(1))
          .subscribe((data) => {
            const uv = { ...data };
            this.sessionDataService.outputUv(uv);
          });
      });
    }
  }
}
