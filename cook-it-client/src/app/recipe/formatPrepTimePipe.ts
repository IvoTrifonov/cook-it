import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrepTimePipe'
})
export class FormatPrepTimePipe implements PipeTransform {
  transform(minutes: number) {
    let formatTime: string;

    if (minutes < 60) {
      formatTime = `${minutes}m.`
    } else if (minutes === 60) {
      formatTime = '1h.';
    } else {
      const hours = Math.floor(minutes / 60);          
      minutes = minutes % 60;
  
      formatTime = `${hours}h. and ${minutes}m.`
    }
  
    return formatTime;
  }

}