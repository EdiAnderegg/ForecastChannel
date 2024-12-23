import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.interface';
import {
  Current,
  Today,
  Tomorrow,
  week,
  weekArr,
  Day,
} from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private api: string = '1a090ef1bd211e03abf218229fd62e55';
  private url: string = 'https://api.openweathermap.org/data/2.5/weather';
  private weekUrl: string = 'https://api.openweathermap.org/data/2.5/forecast';
  private settings!: User;

  public setWeather(user: User | Partial<User> | undefined) {
    this.settings = {
      lat: user?.lat!,
      lon: user?.lon!,
      tempUnit: user?.tempUnit!,
      windSpeed: user?.windSpeed!,
      location: user?.location!,
    };
  }

  private buildUrl(): string {
    return `${this.url}?lat=${this.settings.lat}&lon=${this.settings.lon}&appid=${this.api}&units=${this.settings.tempUnit}`;
  }

  private buildWeekUrl(): string {
    return `${this.weekUrl}?lat=${this.settings.lat}&lon=${this.settings.lon}&appid=${this.api}&units=${this.settings.tempUnit}`;
  }

  public getCurrentWeather$(): Observable<any> {
    const Weather: any[] = [];
    return this.http.get<any>(this.buildUrl()).pipe(
      map((res) => {
        const Current: Current = {
          location: res.name,
          temperature: res.main.temp,
          wind: {
            speed: res.wind.speed,
            deg: res.wind.deg,
            gust: res.wind.gust,
          },
          description: res.weather[0].description,
          time: Number(`${res.dt}000`),
        };

        const Today: Today = {
          location: res.name,
          temperature: res.main.temp_max,
          wind: {
            speed: res.wind.speed,
            deg: res.wind.deg,
            gust: res.wind.gust,
          },
          description: res.weather[0].description,
          time: Number(`${res.dt}000`),
        };

        const Day: Day = {
          sunrise: res.sys.sunrise,
          sunset: res.sys.sunset,
          actual: res.dt,
        };

        Weather.push(Current, Today, Day);
        return Weather;
      })
    );
  }

  public getWeekWeather$(): Observable<any> {
    const Weather: any[] = [];
    return this.http.get<any>(this.buildWeekUrl()).pipe(
      map((res) => {
        const Tomorrow: Tomorrow = {
          location: res.city.name,
          temperature: res.list[8].main.temp,
          wind: {
            speed: res.list[8].wind.speed,
            deg: res.list[8].wind.deg,
            gust: res.list[8].wind.gust,
          },
          description: res.list[8].weather[0].description,
          time: new Date(res.list[8].dt_txt).getTime(),
        };

        const WeekArr: weekArr = {
          location: res.city.name,
          time: new Date(res.list[0].dt_txt).getTime(),
          days: [],
        };
        for (let i = 0; i < res.list.length; i += 8) {
          const day: week = {
            temp1: res.list[i].main.temp_max,
            temp2: res.list[i + 4].main.temp_min,
            description: res.list[i].weather[0].description,
            day: new Date(res.list[i].dt_txt).getDay(),
          };
          WeekArr.days.push(day);
        }
        Weather.push(Tomorrow, WeekArr);
        return Weather;
      })
    );
  }
  constructor(private readonly http: HttpClient) {}
}
