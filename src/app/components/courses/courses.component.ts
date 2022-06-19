import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CoursesService } from "src/app/services/courses.service";
//import { allCourses } from 'src/app/data/CoursData';

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent implements OnInit {
  courses: any;
  res:any=[];
  obj: any = {};
  title:string;
  searchForm: FormGroup;
  parentVariables: any = {
    //// banner
    variable1: "Popular Online Courses", //variable pour banner
    variable2: "We put at your disposal courses presented by expert teachers!", // Temp Number
  };

  constructor(private coursesService: CoursesService, private router: Router) {}
  connectedUserId: any;
  url: string;
  ngOnInit() {
    this.connectedUserId = JSON.parse(localStorage.getItem("ConnectedUser")); // variable sabbit fiha tous le contenu de orders
    this.url = this.router.url;
    if (this.url == "/mycourses") {
      ///espace student :cours reservés: 2 search 
      this.coursesService.getAllReservationsStudent(this.connectedUserId._id).subscribe((response) => {
          console.log('here into my courses ', response.courses);
          
          this.courses = response.courses;
          this.title=response.title;
          
       }); 
        }
    else  {
      this.coursesService.getAllCourses().subscribe((response) => {
        this.courses = response.courses;
        // this.title = response.response;
      });
    }

    ////display courses of tutor
    if (this.connectedUserId && this.connectedUserId.role == "tutor") {
      console.log("log", this.connectedUserId._id);
      this.coursesService
        .getAllCoursesByProf(this.connectedUserId._id)
        .subscribe((response) => {
          this.courses = response.courses;
          // this.title = response.response;
        });
    }
    
  }
  searchScore() {
    this.coursesService.searchCourse(this.obj).subscribe((data) => {
      //this.messsage=data.message;
      this.courses = data.course;

      // console.log('here data after search');
    });
  }
}
