import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "custumGender",
})
export class CustumGenderPipe implements PipeTransform {
  transform(x) {
    // ternary operator
    return x.gender == "female" ? "Mme" : "Mr";
  }

  // if(x=='female'){
  //   return 'Mme';
  // }
  // return 'Mr';
}
