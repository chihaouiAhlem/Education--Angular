import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custumPrice'
})
export class CustumPricePipe implements PipeTransform {

  transform(event:any) {
    var m='';
    for (let i = 0; i < event.length; i++) {
      for (let j = (i+1); j < event.length; j++) {
      if (event[i].eventPrice <= event[j].eventPrice) {
        m=event[i];
        event[i]=event[j];
        event[j]=m;
      }  
           }
          }   return event;  
  }

}
