import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-tutors',
  templateUrl: './best-tutors.component.html',
  styleUrls: ['./best-tutors.component.css']
})
export class BestTutorsComponent implements OnInit {
  bestTutor:any;
  parentVariables: any = {
    variable1: "The Best Tutors in Town",//variable pour banner
    variable2: "", // Temp Number
  };
  constructor() { }

  ngOnInit() {
    this.bestTutor=[
      {id:1,firstName:"Ali",lastName:"memni",speciality:"infographie",adress:"sousse",cin:"01231234",email:"ch@getMaxListeners.com",password:"12312312@A" },
      {id:5,firstName:"maram",lastName:"tounsii",speciality:"php5",adress:"kairouan",cin:"01234567",email:"ch@getMaxListeners.com",password:"12345678@.l" },//t
      //t

  ];
  }

}
