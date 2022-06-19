import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  coursPromo :any=[{id:4,coursName:"test logiciel",nbrHours:55,coursPlaces:20,coursPrice:260,coursDate: "02/03/2023" ,coursInfo:"ANGULAR course: installation/templates/codes led by experts in their fields" },//t
  {id:5,coursName:"Bootstrap",nbrHours:55,coursPlaces:20,coursPrice:260,coursDate: "02/03/2023" ,coursInfo:"ANGULAR course: installation/templates/codes led by experts in their fields" },//t
];//t
parentVariables: any = {
  variable1: "Popular Online Courses",//variable pour banner
  variable2: "We put at your disposal courses presented by expert teachers!", // Temp Number
};
  constructor() { }

  ngOnInit() {
  }

}
