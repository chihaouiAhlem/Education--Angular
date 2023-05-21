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
  parentVariables: any = {  //// banner
    variable1: "Popular Online Courses", //variable pour banner
    variable2: "We put at your disposal courses presented by expert teachers!", // Temp Number
  };
  filteredObjects: Object[];
    
  tab:any=[]
  constructor(private coursesService: CoursesService, private router: Router) {}
  connectedUserId: any;
  url: string;
  ngOnInit() {
    var langues = navigator.language;
      console.log("eeeee",langues);//fr-FR
      if(langues==="fr-FR"){
        this.coursesService.getAllCourses().subscribe((response) => {
          this.tab= response.courses;
          this.filteredObjects= this.tab.filter(object => object.langue === "fr");

            // this.title = response.response;
          });
      // Filter objects by language

      }
      else{
        this.coursesService.getAllCourses().subscribe((response) => {
          this.tab= response.courses;
          this.filteredObjects= this.tab.filter(object => object.langue === "en");

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

   
    
    // Handle the language selection change event from the language select component
    onLanguageChanged(language: string) {
      var langues = navigator.language;
      console.log("eeeee",langues);//fr-FR
      if (language === 'lg' && langues==="fr-FR"   ) {
       
        this.coursesService.getAllCourses().subscribe((response) => {
          this.tab= response.courses;
          
            // this.title = response.response;
          });
          this.filteredObjects= this.tab.filter(object => object.langue === "fr");
      // Filter objects by language
      }
           
  else  if (language === 'all'  ) {
    // Show all objects
    this.coursesService.getAllCourses().subscribe((response) => {
      this.filteredObjects= response.courses;
        // this.title = response.response;
      });
   // this.filteredObjects = this.objects;
    } 
    else  {
      this.coursesService.getAllCourses().subscribe((response) => {
        this.tab= response.courses;
        
          // this.title = response.response;
        });
        this.filteredObjects= this.tab.filter(object => object.langue === language);
    // Filter objects by language
    }
    }
    

  
}
