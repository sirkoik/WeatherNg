import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timespan'
})
export class TimespanPipe implements PipeTransform {
  // take a time span (in seconds) and convert it to
  // hours, minutes, seconds.
  // output format can include or exclude hours,
  // minutes, and seconds.
  transform(span: number, format?: string): string {
    if (!format) format = 'hms';

    span = Math.abs(span);

    const hrs = (span - (span % 3600)) / 3600;
    const min = Math.floor((span % 3600) / 60);
    const sec = (span % 3600) % 60;

    const spanArr = [];
    if (hrs > 0 && format.includes('h')) spanArr.push(`${hrs}h`);
    if (min > 0 && format.includes('m')) spanArr.push(`${min}m`);
    if (sec > 0 && format.includes('s')) spanArr.push(`${sec}s`);

    return spanArr.join(' ') || '0s';
  }
}
