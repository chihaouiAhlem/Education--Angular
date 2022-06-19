import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WatherService } from 'src/app/services/wather.service';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {
  searchForm:FormGroup;
  obj: any = {};
  x:any;
  path:string;
  resultWeather:any;
  myDate = new Date();
  constructor(private X: FormBuilder,private router:Router,private activateRoute:ActivatedRoute,private watherService:WatherService) { }

  ngOnInit() {
    this.searchForm = this.X.group({
      ///N9OLLOU GROUPILI les imputs //ylemhom fi signupForm
      ville: ["", [Validators.required]] //akther mn validateur n7oto []
     

    });
  }
  search(){   
    //teamToFind obj{team:valeur}
    console.log("here city",this.searchForm.value);///ba3d puth
    this.watherService.wather(this.searchForm.value).subscribe((data)=>{
      //if(data.message=="0")  {
    this.resultWeather=data.result;
    this.path=`http://openweathermap.org/img/w/${data.result.image}.png`;
   console.log("here into test weather API",data.result);
   // this.path=``;
   
console.log(data);
      }
      
   // }
    );
 }

}
