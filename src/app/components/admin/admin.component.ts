import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  parentVariables: any = {
    variable1: "Dashboared admin",
    variable2: "Welcome ", // Temp Number
  };
  users:any;
  headerTutor:boolean=false;
  headerAdmin:boolean=false;
  constructor() { }

  ngOnInit() {
    this.users=JSON.parse(localStorage.getItem("ConnectedUser") || "[]");
    console.log("here my connected user",this.users.role);
    
  if (this.users.role=='admin') {
   this.headerAdmin=true;
   this.headerTutor=false;

 }
  if (this.users.role=='tutor') {
    this.headerTutor=true;

this.parentVariables.variable1= "Dashboared Tutor"}
  }

}
