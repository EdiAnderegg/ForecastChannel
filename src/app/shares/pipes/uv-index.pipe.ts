import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uvIndex'
})
export class UvIndexPipe implements PipeTransform {

  transform(value: number, ...args: string[]): string | number{

    const [system] = args;
    const rounded = Math.round(value*10);

    if(system === 'string'){
    switch(rounded){
      case 1:
        return 'Low';
      case 2:
        return 'Low';
      case 3:
        return 'Moderate';
      case 4:
        return 'Moderate';
      case 5:
        return 'Moderate';
      case 6:
        return 'High';
      case 7:
        return 'High';
      case 8:
        return 'Very High';
      case 9:
        return 'Very High';
      case 10:
        return 'Very High';
      case 11:
        return 'Extreme';
    }
  }

  if(system === 'number'){
    return rounded;
  }
    return 'no Info';
  }
}
