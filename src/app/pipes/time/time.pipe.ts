import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

}
