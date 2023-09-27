import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uvIndex'
})
export class UvIndexPipe implements PipeTransform {

  transform(value: number): string{

    const rounded : number = Math.round(value);

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
    return 'no Info';
  }
}
