import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonpretty'
})
export class JsonprettyPipe implements PipeTransform {

  transform(value: string) {
    return JSON.stringify(value, undefined, 4)
      .replace(/ /g, '&nbsp;')
      .replace(/\n/g, '<br/>');;
  }

}
