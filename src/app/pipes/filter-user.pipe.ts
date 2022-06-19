import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(objs:any,x:string) {
    if(x === undefined){
      return objs;
    }
    ///objs: tableu l kbir
    //obj: lobjet ml tab
    return(objs.filter(obj =>{
      return (obj.firstName.toLowerCase().includes(x.toLowerCase()))
       || (obj.lastName.toLowerCase().includes(x.toLowerCase()))
    }
    ))
    }
  

}
