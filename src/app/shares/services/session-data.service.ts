import { Current, Today, Tomorrow, weekArr } from '../interfaces/weather.interface';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  private Current = new BehaviorSubject<Current | undefined>(undefined);
  private Today = new BehaviorSubject<Today | undefined>(undefined);
  private Tomorrow = new BehaviorSubject<Tomorrow | undefined>(undefined);
  private Week = new BehaviorSubject<weekArr | undefined>(undefined);



  public outputCurrent(WeatherObject: Current | undefined):void{
     this.Current.next(WeatherObject);
  };
  public outputToday(WeatherObject: Today | undefined):void{
    this.Today.next(WeatherObject);
  };

  public outputTomorrow(WeatherObject: Tomorrow | undefined):void{
    this.Tomorrow.next(WeatherObject);
  };

  public outputWeek(WeatherObject: weekArr | undefined):void{
    this.Week.next(WeatherObject);
  }

  public getCurrent$(): Observable<Current | undefined> {
    return this.Current.asObservable();
  };
  public getToday$(): Observable<Today | undefined> {
    return this.Today.asObservable();
  };

  public getTomorrow$(): Observable<Tomorrow | undefined>{
    return this.Tomorrow.asObservable();
  }

  public getWeek$(): Observable<weekArr | undefined>{
    return this.Week.asObservable();
  }

  constructor() {
   }
}
