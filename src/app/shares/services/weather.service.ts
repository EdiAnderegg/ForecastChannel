import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Current } from '../interfaces/current.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private api : string = '1a090ef1bd211e03abf218229fd62e55';
  private url : string = 'https://api.openweathermap.org/data/2.5/weather';
  private settings! : User;

  public setWeather(lat : number, lon : number, unit : string, location : string){
    this.settings = {lat : lat, lon : lon, units : unit, location : location};
  }

  private buildUrl(): string{
    return`${this.url}?lat=${this.settings.lat}&lon=${this.settings.lon}&appid=${this.api}&units=${this.settings.units}`;
  }

  public getCurrentWeather$(): Observable<Current>{
    const date = new Date();

    return this.http.get<any>(this.buildUrl())
    .pipe(map((res) =>{
      const Current : Current = {
        location : res.name,
        temperature : res.main.temp,
        wind : res.wind,
        description : res.weather[0].description,
        icon : res.weather[0].main,
        time : date.getTime()
      }
      return Current;
    }));
  }
  constructor(private readonly http: HttpClient) { }
}
