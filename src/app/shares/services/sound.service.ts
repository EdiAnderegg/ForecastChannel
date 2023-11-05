import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private sounds: { [key: string]: HTMLAudioElement } = {};

  constructor() {}

  public preload(soundName: string, soundPath: string) {
    return new Observable<void>();
  }
}
