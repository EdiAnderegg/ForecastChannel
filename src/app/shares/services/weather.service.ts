import { Weather } from 'src/app/shares/interfaces/weather.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Current, Today, Tomorrow, week } from '../interfaces/weather.interface';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private api : string = '1a090ef1bd211e03abf218229fd62e55';
  private url : string = 'https://api.openweathermap.org/data/2.5/weather';
  private weekUrl : string = 'https://api.openweathermap.org/data/2.5/forecast';
  private settings! : User;

  public setWeather(lat : number, lon : number, unit : string, location : string){
    this.settings = {lat : lat, lon : lon, units : unit, location : location};
  }

  private buildUrl(): string{
    return`${this.url}?lat=${this.settings.lat}&lon=${this.settings.lon}&appid=${this.api}&units=${this.settings.units}`;
  }

  private buildWeekUrl() : string{
    return `${this.weekUrl}?lat=${this.settings.lat}&lon=${this.settings.lon}&appid=${this.api}&units=${this.settings.units}`;
  }

  public getCurrentWeather$(): Observable<any>{

    const Weather :any[] = [];
    return this.http.get<any>(this.buildUrl())
    .pipe(map((res) =>{
      const Current : Current = {
        location : res.name,
        temperature : res.main.temp,
        wind : { speed: res.wind.speed,
                 deg: res.wind.deg,
                 gust: res.wind.gust
                },
        description : res.weather[0].description,
        icon : res.weather[0].main,
        time : new Date(Number(`${res.dt}000`)).getTime()
      }
      const Today : Today = {
        location : res.name,
        temperature : res.main.temp_max,
        wind : { speed: res.wind.speed,
                 deg: res.wind.deg,
                 gust: res.wind.gust
                },
        description : res.weather[0].description,
        icon : res.weather[0].main,
        time: new Date(Number(`${res.dt}000`)).getTime()
      };
      Weather.push(Current,Today);
      return Weather;
    }));
  }

  public getWeekWeather$(): Observable<any>{
    const Weather :any[] = [];
    const WeekArr : any[] = [];
    return this.http.get<any>(this.buildWeekUrl())
    .pipe(map((res)=>{
      console.log('Tomorrow:')
      console.log(res)
      const Tomorrow : Tomorrow = {
        location : res.city.name,
        temperature : res.list[8].main.temp,
        wind : { speed: res.list[8].wind.speed,
                 deg: res.list[8].wind.deg,
                 gust: res.list[8].wind.gust
                },
        description : res.list[8].weather[0].description,
        icon : res.list[8].weather[0].main,
        time :  new Date(res.list[8].dt_txt).getTime()
      }

      for(let i = 0; i < res.list.length; i+=8)
      {
        console.log(i)
        const day : week = {
          location : res.city.name,
          temp1 : res.list[i].main.temp_max,
          temp2 : res.list[i+7].main.temp_min,
          description : res.list[i].weather[0].description,
          icon : res.list[i].weather[0].main,
          day : new Date(res.list[i].dt_txt).getTime()
        }
        WeekArr.push(day);
      }
      Weather.push(Tomorrow, WeekArr);
      return Weather;
    }));
  }
  constructor(private readonly http: HttpClient) { }
}
