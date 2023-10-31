import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private icon: string[] = [
    'assets/img/icon/day/01d.png',
    'assets/img/icon/day/02d.png',
    'assets/img/icon/day/03d.png',
    'assets/img/icon/day/04d.png',
    'assets/img/icon/day/09d.png',
    'assets/img/icon/day/10d.png',
    'assets/img/icon/day/11d.png',
    'assets/img/icon/day/13d.png',
    'assets/img/icon/day/50d.png',
  ];

  public getIcon(condition: string): any {
    const icon = [...this.icon];
    switch (condition) {
      case 'clear sky':
        return icon[0];
      case 'few clouds':
        return icon[1];
      case 'scattered clouds':
        return icon[3];
      case 'broken clouds':
        return icon[3];
      case 'overcast clouds':
        return icon[2];
      case 'light rain':
        return icon[4];
      case 'shower rain':
        return icon[4];
      case 'moderate rain':
        return icon[4];
      case 'rain':
        return icon[5];
      case 'heavy intensity rain':
        return icon[5];
      case 'thunderstrom':
        return icon[6];
      case 'snow':
        return icon[7];
      case 'mist':
        return icon[8];
    }
    return undefined;
  }
  constructor() {}
}
