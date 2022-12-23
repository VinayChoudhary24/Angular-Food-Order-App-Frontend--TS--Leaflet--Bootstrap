import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenPipe',
})
export class ShortenPipe implements PipeTransform {

  transform(value: any) {
    // This will make Sure Only 8 Characters Are Displayed
    if(value.length > 5) {
      return value.substr(0, 5) + '...';
    }
    return value;
  }

}
