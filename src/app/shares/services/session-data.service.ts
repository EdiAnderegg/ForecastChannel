import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Current } from '../interfaces/current.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  private Current = new BehaviorSubject<Current | undefined>(undefined);

  public outputWeather(WeatherObject: Current | undefined):void{
     this.Current.next(WeatherObject);
  };

  public getWeather$(): Observable<Current | undefined> {
    return this.Current.asObservable();
  }

  constructor() {
   }
}
