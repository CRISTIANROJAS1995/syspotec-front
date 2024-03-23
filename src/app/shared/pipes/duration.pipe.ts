import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(time: number, ...args: unknown[]): unknown {
    if (!time) {
      return '00:00';
    }
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    return `${('' + minutes).padStart(2, '0')}:${('' + seconds).padStart(2, '0')}`;
  }
}
