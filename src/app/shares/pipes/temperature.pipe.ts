import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'metric') return 'Celsius';
    if (value === 'imperial') return 'Fahrenheit';
    return '';
  }
}
