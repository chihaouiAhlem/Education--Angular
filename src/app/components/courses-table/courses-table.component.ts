import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
//import { allCourses } from "src/app/data/CoursData";
import { CoursesService } from "src/app/services/courses.service";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-courses-table",
  templateUrl: "./courses-table.component.html",
  styleUrls: ["./courses-table.component.css"],
})
export class CoursesTableComponent implements OnInit {
  isStudent:boolean=false;
  isDisplay:boolean=false;
  students:any;
  courses: any = [];
  newTab:any=[];
  searchForm: FormGroup;
  obj: any = {};
  findCourse: any = [];
  path: any;
  pricesTab: any;
  unique:any=[];
  title:string;
  //courses:any=[];
  //pagination
  pageOfItems: Array<any>;
  connectedUserId: any;
  url: string;

  constructor(private router: Router,private coursesService: CoursesService,private usersService :UsersService) {}

  ngOnInit() {

    

    this.connectedUserId = JSON.parse(localStorage.getItem("ConnectedUser")); // variable sabbit fiha tous le contenu de orders
    this.url = this.router.url;
     this.coursesService.getAllCourses().subscribe((response) =>{
      this.courses = response.courses;
      this.title = response.response;
      
     });
     ////
     if ( this.connectedUserId.role=="tutor") {

      this.coursesService.getAllCoursesByProf(this.connectedUserId._id).subscribe((response) =>{
      this.courses = response.courses;
      this.title = response.response;
      
     });
     }

  }

  search() {
    //console.log(this.obj);
    this.findCourse = [];
    for (let i = 0; i < this.courses.length; i++) {
      if (
        this.courses[i].coursName == this.obj.nameSearch &&
        this.courses[i].coursPrice == this.obj.priceSearch
      ) {
        this.findCourse.push(this.courses[i]);
        
      }
    }

    this.courses = this.findCourse;
  
  }
  ////display all course
 
  
 ////
  ///fct pour afficher match
  goToDisplay(param: number) {
    //  alert(param)
    // location.replace non ta3ml reload
    this.router.navigate([`coursesInfo/${param}`]); //najmou nhezou tableau//matchInfo howa path //
  }
  goToEdit(param) {
    // location.replace non ta3ml reload
    this.router.navigate([`editCourse/${param}`]); //najmou nhezou tableau//matchInfo howa path //
  }
  deleteMatchById(x) {
    ////loulanya une methode tab3a html
    this.coursesService.deleteCourseById(x).subscribe((data)=>{
      console.log('here after delete',data.pp);///reponse pp tjih fi data
      ////refresh sans reload
      ////sna3na fct kma on init bech ya3ml refresh automatique
      this.allCourses();
    }
    ); ///meth teb3a service
  }
  ////function pour price :ngstyle ngclass

  //
  allCourses(){
    this.coursesService.getAllCourses().subscribe((response) => {
      this.courses = response.courses;
      this.title=response.response;///matches loula tableau vide declaree matches2 :ili ja ml BE

    });
  }
  priceStyle(a) {
    if (a < 500 && a > 0) {
      return "orange";
    } else if (a >= 500 && a < 1000) {
      return "blue";
    } else {
      return "red";
    }
  }
  /////funt that :courses places
  placesStyle(a) {
    if (0 <a  && a <  3) {
      return "orange";
    } else if (a >= 3) {
      return "blue";
    } else {
      return "red";
    }
  }
  
  

  onChange(x) {
   // console.log("here x", x);
    this.pricesTab = this.courses.filter((obj) => {
      return obj.coursName == x;
    });
    for(var i=0;i<this.pricesTab.length;i++) {
      for(var j=i+1;j<this.pricesTab.length;j++) {
          if(this.pricesTab[i].coursPrice===this.pricesTab[j].coursPrice) {
            this.pricesTab.splice(j,1);
          }
      }
  }
  }
  goToDisplayStdents(idCourse){
    this.isDisplay=true;
    this.isStudent=true;
    
    this.coursesService.getStdentsperCourses(idCourse).subscribe((response) => {
      console.log('here into students ', response.students);
      
      this.students = response.students;
     // this.title=response.title;
      
   }); 

  }
displayTutor(idTutor){

  this.usersService.getUserById(idTutor).subscribe((data) =>{
    console.log('here data',data.pp);
    this.newTab=data.pp});
}
  
////Pagination
onChangePage(pageOfItems: Array<any>) {
  // update current page of items
  this.pageOfItems = pageOfItems;
  }
}
