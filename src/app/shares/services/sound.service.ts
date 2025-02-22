import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private sounds: { [key: string]: HTMLAudioElement } = {};

  constructor() {}

  public preload(soundName: string, soundPath: string) {
    return new Observable<void>((observer) => {
      const audio = new Audio();
      audio.src = soundPath;

      audio.addEventListener('canplaythrough', () => {
        this.sounds[soundName] = audio;
        observer.next();
        observer.complete();
      });

      audio.addEventListener('error', (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  private getSound(soundName: string): HTMLAudioElement | undefined {
    return this.sounds[soundName];
  }

  public playSound(soundName: string, loop: boolean): void {
    const sound = this.getSound(soundName);
    if (sound) {
      sound.play();
      if (loop) {
        sound!.loop = true;
      }
    }
  }

  public stopSound(soundName: string): void {
    const sound = this.getSound(soundName);
    if (sound) {
      $(sound).fadeOut(250, () => {
        sound.pause();
        sound.currentTime = 0;
        $(sound).fadeIn(250);
      });
    }
  }
}
