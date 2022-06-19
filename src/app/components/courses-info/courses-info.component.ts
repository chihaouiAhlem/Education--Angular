import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { allCourses } from 'src/app/data/CoursData';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-info',
  templateUrl: './courses-info.component.html',
  styleUrls: ['./courses-info.component.css']
})
export class CoursesInfoComponent implements OnInit {
  findedCourse:any;
  //courses:any=allCourses;
  courses: any = [];
x:any=[];
  findId:any;
  newTab:any=[];//n7ot fih les cours wella cours info
  constructor(private ActivatedRoute:ActivatedRoute, private coursesService:CoursesService) { }

  ngOnInit() {
    ////find id lors de display info
    this.newTab=this.courses;///new tab marra fih allcourses 
    //marra fih kn l coursInfo celon id l fil url
    this.findId=this.ActivatedRoute.snapshot.paramMap.get('id');
   ///ken nal9ah ysir ce traitement si non par def te5eth les courses lkol
    if (this.findId) {
      // (this.findedCourse=this.courses.find((obj)=>{
      //   return obj.id==this.findId;
      //   this.newTab.push(obj);
      // });)
     // this.coursesService.getCourseById(this.findId).subscribe();///yrajja3 objet 7asb l id
      this.coursesService.getCourseById(this.findId).subscribe((data) =>{
        //console.log('here data',data.pp);
        this.newTab=data.pp});

        //this.title = response.response;
        
      
      //  this.matchSevice.getMatchById(this.matchId).subscribe((data)=>{console.log('here data',data.x);});




      
    }

  }

}
