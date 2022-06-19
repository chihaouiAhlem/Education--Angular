import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "custumPassword",
})
export class CustumPasswordPipe implements PipeTransform {
  transform(ch) {
    var result = "";
    for (var i = 0; i < ch.length; i++) {
      var x = ch[i];
      x = "*";
      // ch[i]='*'; on peux pasecrire sa dans js
      //   var m=ch[i];

      result = result + x;
    }
    return result;
  }
}
