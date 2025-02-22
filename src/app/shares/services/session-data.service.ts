import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  Current,
  Day,
  Today,
  Tomorrow,
  weekArr,
} from '../interfaces/weather.interface';
import { User } from '../interfaces/user.interface';
import { UV } from '../interfaces/uv.interface';
import { Location } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionDataService {
  private UV = new BehaviorSubject<UV | undefined>(undefined);
  private Current = new BehaviorSubject<Current | undefined>(undefined);
  private Today = new BehaviorSubject<Today | undefined>(undefined);
  private Tomorrow = new BehaviorSubject<Tomorrow | undefined>(undefined);
  private Week = new BehaviorSubject<weekArr | undefined>(undefined);
  private User = new BehaviorSubject<User | undefined>(undefined);
  /* private Location = new BehaviorSubject<Location | undefined>(undefined);*/
  private List = new BehaviorSubject<Location[] | undefined>(undefined);
  private Day = new BehaviorSubject<Day | undefined>(undefined);

  public outputCurrent(WeatherObject: Current | undefined): void {
    this.Current.next(WeatherObject);
  }
  public outputToday(WeatherObject: Today | undefined): void {
    this.Today.next(WeatherObject);
  }

  public outputTomorrow(WeatherObject: Tomorrow | undefined): void {
    this.Tomorrow.next(WeatherObject);
  }

  public outputWeek(WeatherObject: weekArr | undefined): void {
    this.Week.next(WeatherObject);
  }

  public outputUv(UvObject: UV | undefined): void {
    this.UV.next(UvObject);
  }

  public outputUser(User: User | undefined): void {
    this.User.next(User);
  }

  public outputPartialUser(PartialUser: Partial<User>): void {
    const currentUser = this.User.getValue();
    if (currentUser) {
      this.User.next({ ...currentUser, ...PartialUser });
    }
  }

  /*public outputLocation(Location: Location | undefined): void {
    this.Location.next(Location);
  }*/

  public outputListofLocations(List: Location[] | undefined): void {
    this.List.next(List);
  }

  public outputDay(Day: Day | undefined): void {
    this.Day.next(Day);
  }

  public getCurrent$(): Observable<Current | undefined> {
    return this.Current.asObservable();
  }
  public getToday$(): Observable<Today | undefined> {
    return this.Today.asObservable();
  }

  public getTomorrow$(): Observable<Tomorrow | undefined> {
    return this.Tomorrow.asObservable();
  }

  public getWeek$(): Observable<weekArr | undefined> {
    return this.Week.asObservable();
  }

  public getUv$(): Observable<UV | undefined> {
    return this.UV.asObservable();
  }

  public getUser$(): Observable<User | undefined> {
    return this.User.asObservable();
  }

  /* public getLocation$(): Observable<Location | undefined> {
    return this.Location.asObservable();
  }*/

  public getListofLocations$(): Observable<Location[] | undefined> {
    return this.List.asObservable();
  }

  public getDay$(): Observable<Day | undefined> {
    return this.Day.asObservable();
  }

  constructor() {}
}
