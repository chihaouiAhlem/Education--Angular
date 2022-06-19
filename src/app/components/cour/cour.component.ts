import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-cour',
  templateUrl: './cour.component.html',
  styleUrls: ['./cour.component.css']
})
export class CourComponent implements OnInit {
  @Input() x:any;
  isDisplay:true;
  students:any;
  isres:boolean=false;
  message:string;
  messageRes:number;
  path:string;
  connectedUserTab:any;
  connectedUserId:any;
  reserve:any={};
  headerUser:boolean=false;
  users:any;
  isStudents:boolean=false;
  url:string;


  constructor(private coursesService:CoursesService,private router:Router) {
   
   }

  ngOnInit() {
    this.url=this.router.url;
    this.connectedUserTab = JSON.parse(localStorage.getItem("ConnectedUser") || "[]"); // variable sabbit fiha tous le contenu de orders
    this.connectedUserId=this.connectedUserTab ._id;

    this.users=JSON.parse(localStorage.getItem("ConnectedUser") || "[]");

    if (this.users.role=='student' && this.users.status=='ok') {
      this.headerUser=true;
    }
    if (this.url=="/myStudents") {
      
      this.isStudents=true;
    }

  }
 

  addToBasket(idCours,coursPlaces,coursDate){
    var q = new Date();
    this.coursesService.getAllReservationsByIdUserAndCours(this.connectedUserId,idCours).subscribe((response) =>{
      this.messageRes = response.message;
     // this.title = response.response;
     console.log("here msg reser",response)
      
   
     console.log("messageres",this.messageRes)
if (coursPlaces>0 &&  this.messageRes==0) {
  //if ( this.messageRes!="existe") {
    
  
  this.reserve.idCourse=idCours;
  this.reserve.userId=this.connectedUserId;
  //console.log("here you can reserve",this.reserve);

  this.coursesService.addReservation(this.reserve).subscribe(
    (data)=>{
     console.log('here data after add',data.message);
     // this.router.navigate([`admin`]);
     this.message=data.message;
     if (data.message==" registered with success") {
      this.headerUser=false;

      
     }
    } );
    this.coursesService.updatePlaces(this.reserve).subscribe((data)=>{
      // this.course=data.pp;
      console.log('places edited with success',data);
      this.headerUser=false;
 
     });
    //}
    //else{
      //this.headerUser=true;

   // }
}

else{console.log("here you can t reserve",coursPlaces,coursDate,q);
      this.message="you are registered in this training ";

}  });
/////////////il faut que student dans un cours une seul inscrit!!!
  }

  goToDisplay(idCourse){
    this.isDisplay=true;
    this.coursesService.getStdentsperCourses(idCourse).subscribe((response) => {
      console.log('here into students ', response.students);
      
      this.students = response.students;
     // this.title=response.title;
      
   }); 

  }

}
