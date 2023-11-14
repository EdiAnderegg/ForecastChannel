import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCurrent = new BehaviorSubject<boolean>(false);
  private loadingWeek = new BehaviorSubject<boolean>(false);
  private loadingUv = new BehaviorSubject<boolean>(false);
  private loadingUser = new BehaviorSubject<boolean>(false);
  private loadingBackgroundSound = new BehaviorSubject<boolean>(false);
  private loadingEventSound = new BehaviorSubject<boolean>(false);
  public playingBackgroundSound: boolean = false;
  public weatherChanged: boolean = false;

  setLoadingCurrent(state: boolean) {
    this.loadingCurrent.next(state);
  }

  setLoadingWeek(state: boolean) {
    this.loadingWeek.next(state);
  }

  setLoadingUv(state: boolean) {
    this.loadingUv.next(state);
  }

  setLoadingUser(state: boolean) {
    this.loadingUser.next(state);
  }

  setLoadingBackgroundSound(state: boolean) {
    this.loadingBackgroundSound.next(state);
  }

  setLoadingEventSound(state: boolean) {
    this.loadingEventSound.next(state);
  }

  getLoadingMain(): Observable<boolean> {
    return combineLatest([
      this.loadingCurrent.asObservable(),
      this.loadingWeek.asObservable(),
      this.loadingUv.asObservable(),
      this.loadingBackgroundSound.asObservable(),
    ]).pipe(
      map(([current, week, uv, backGroundSound]) => {
        return !current && !week && !uv && !backGroundSound;
      })
    );
  }

  getLoadingStart(): Observable<boolean> {
    return combineLatest([
      this.loadingCurrent.asObservable(),
      this.loadingBackgroundSound.asObservable(),
      this.loadingEventSound.asObservable(),
    ]).pipe(
      map(([current, backGroundSound, eventSound]) => {
        return !current && !backGroundSound && !eventSound;
      })
    );
  }

  getLoadingSettings(): Observable<boolean> {
    return combineLatest([this.loadingUser.asObservable()]).pipe(
      map(([loadingUser]) => {
        return !loadingUser;
      })
    );
  }
}
