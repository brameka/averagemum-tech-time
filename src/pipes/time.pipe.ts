import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time',
    pure: false
})
export class TimePipe implements PipeTransform {
    transform(minutes: number): any {
        let hours = Math.floor(minutes/60);
        let mins = minutes%60;
        let hour = `${hours}`;
        let min = `${mins}`;

        if(mins < 10) {
          min = `0${mins}`;
        }

        if(hours < 10) {
          hour = `0${hours}`;
        }

        return `${hour}:${min}:00`;
    }
}
