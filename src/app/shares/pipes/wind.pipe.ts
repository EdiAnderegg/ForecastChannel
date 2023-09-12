import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wind'
})
export class WindPipe implements PipeTransform {

  transform(value: number | undefined): string {

   if(value! >= 337.5 && value! <= 360)return  "N";
   if(value! <= 21.5)return  "N";
   if(value! >= 22.5 && value! <= 66.5)return  "NE";
   if(value! >= 67.5 && value! <= 111.5)return  "E";
   if(value! >= 112.5 && value! <= 156.5)return  "SE";
   if(value! >= 157.5 && value! <= 201.5)return  "S";
   if(value! >= 202.5 && value! <= 246.5)return  "SW";
   if(value! >= 247.5 && value! <= 291.5)return  "W";
   if(value! >= 292.5 && value! <= 336.5)return  "NW";
   return "";
  }

}
