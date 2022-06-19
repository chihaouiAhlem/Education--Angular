import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "custumFilter",
})
export class CustumFilterPipe implements PipeTransform {
  ///fct qui s execute automatiquement lors de l appel du pipe avec son nom
  transform(objs: any, x: Date, y: Date) {
    // m:String;
    ///lezem date loula mawjouda w akber ml
    if (x > y || x == null) {
      return objs;
    } else if (x != undefined && y == null) {
      return objs.filter((obj) => {
        return obj.eventDate >= x;
      });
    } else {
      return objs.filter((obj) => {
        return obj.eventDate >= x && obj.eventDate <= y;
      }); ///methode de filter
      ///methode de filter
    }
  }
}
