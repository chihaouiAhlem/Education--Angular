import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allCourses } from 'src/app/data/CoursData';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  addCourseForm:FormGroup;
course:any={};
findId:any;
findObj:any;
courses=allCourses;
findTab:any=[];
imagePreview:string;
parentVariables: any = {
  variable1: "ADD courses",
  variable2: "", // Temp Number
};
message:string;
  constructor( private formBuilder:FormBuilder ,private router:Router, private activatedRoute:ActivatedRoute,private coursesService:CoursesService) { }
idTutor:string;
 connectedUserId:any;
  ngOnInit() {
    this.connectedUserId = JSON.parse(localStorage.getItem("ConnectedUser") || "[]"); // variable sabbit fiha tous le contenu de orders
    this.addCourseForm = this.formBuilder.group({
      coursName: [''],
      nbrHours: [''],
      coursPlaces: [''],
      coursPrice: [''],
      coursDate: [''],
      coursInfo: [''],
     idProf:[''],
      
      img: ['']
    
    });




//this.course={};
this.findId=this.activatedRoute.snapshot.paramMap.get('id');

if(this.findId){
 // (this.courses=this.findTab;
  //this.course=this.courses[0];)
 // this.coursesService.getCourseById (this.findId).subscribe();
 this.coursesService.getCourseById(this.findId).subscribe((data)=>{
  this.course=data.pp;
});

 //this.parentVariables.variable1="EDIT"
 //alert(this.courses);
 ///les variables title
 this.parentVariables.variable1="Edit";

 this.parentVariables.variable2=this.course.coursName;

}   
  }
  addOrEdit(){
  //console.log(this.course);
  this.findId=this.activatedRoute.snapshot.paramMap.get('id');

  if (this.findId) {
    ////call service to send math.find
    this.coursesService.updateCourse(this.course).subscribe((data)=>{
     // this.course=data.pp;
      this.router.navigate([``]);

    });

}else{
////call service to update math.find
this.course.idProf=this.connectedUserId._id,
console.log('this.course',this.course);

this.coursesService.addCourses(this.course,this.addCourseForm.value.img).subscribe((data)=>{
  console.log("here add");
  this.router.navigate([``]);

});

}

}
/////multer 
onImageSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  console.log('Here my file', file);
  
   this.addCourseForm.patchValue({ img: file });
   this.addCourseForm.updateValueAndValidity();
  const reader = new FileReader();
   reader.onload = () => {
     this.imagePreview = reader.result as string
 }; 
  reader.readAsDataURL(file);
}
}
