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

  setLoadingCurrent(state: boolean) {
    this.loadingCurrent.next(state);
  }

  setLoadingWeek(state: boolean) {
    this.loadingWeek.next(state);
  }

  setLoadingUv(state: boolean) {
    this.loadingUv.next(state);
  }

  getLoadingMain(): Observable<boolean> {
    return combineLatest([
      this.loadingCurrent.asObservable(),
      this.loadingWeek.asObservable(),
      this.loadingUv.asObservable(),
    ]).pipe(
      map(([current, week, uv]) => {
        return !current && !week && !uv;
      })
    );
  }

  getLoadingStart(): Observable<boolean> {
    return combineLatest([this.loadingCurrent.asObservable()]).pipe(
      map(([current]) => {
        return !current;
      })
    );
  }
}