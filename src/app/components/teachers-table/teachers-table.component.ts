import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
//import { allTutors } from 'src/app/data/CoursData';
import { TutorsService } from 'src/app/services/tutors.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {
tutors:any=[];
title:any;
  constructor(private router:Router,private userServices:UsersService) { }

  ngOnInit() {
   // this.tutors=allTutors;
   this.userServices.getAllTutors().subscribe((response) => {
    this.tutors = response.users;
   // this.title=response.message;///matches loula tableau vide declaree matches2 :ili ja ml BE

  });
  }
  goToDisplay(param:number){
    ////redirection avec enregistrement du id dans l url
    this.router.navigate([`tutorInfo/${param}`]);


  }

}
