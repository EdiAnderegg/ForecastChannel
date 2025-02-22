import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'week',
})
export class WeekPipe implements PipeTransform {
  transform(value: number | undefined): string {
    switch (value) {
      case 0:
        return 'SUN';
      case 1:
        return 'MON';
      case 2:
        return 'TUE';
      case 3:
        return 'WED';
      case 4:
        return 'THU';
      case 5:
        return 'FRI';
      case 6:
        return 'SAT';
    }
    return '';
  }
}
