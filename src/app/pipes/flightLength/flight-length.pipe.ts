import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightLength'
})
export class FlightLengthPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const hours = parseInt((value / 60).toFixed(0));
    const minutes = (value % 60).toFixed(0)

    return hours < 24 ?  `${hours}h ${minutes}m`
    : `${(hours / 24).toFixed(0)}d ${hours % 24}h ${minutes}m`
  }

}
