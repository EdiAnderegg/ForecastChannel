import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speed'
})
export class SpeedPipe implements PipeTransform {

  transform(value: number | undefined, ...args: string[]): any {
    const [system] = args
    if(system === "km/h"){
      const speed = Math.round((value! * 3.6)*10)/10;
      return `${speed} km/h`;
    }
    if(system === 'mph'){
      const speed = Math.round((value! * 2.2369)*10)/10;
      return `${speed} mph`;
    }
    return '';
  }

}
