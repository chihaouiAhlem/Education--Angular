import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private usersService:UsersService) { }
  findedUser:any;
  //courses:any=allCourses;
  users: any = [];
x:any=[];
  findId:any;
  newTab:any=[];
  ngOnInit() {
    this.users=JSON.parse(localStorage.getItem("ConnectedUser") || "[]");

    ////find id lors de display info
    this.newTab=this.users;///new tab marra fih allcourses 
    //marra fih kn l coursInfo celon id l fil url
    this.findId=this.activatedRoute.snapshot.paramMap.get('id');
   ///ken nal9ah ysir ce traitement si non par def te5eth les courses lkol
    if (this.findId) {
      // (this.findedCourse=this.courses.find((obj)=>{
      //   return obj.id==this.findId;
      //   this.newTab.push(obj);
      // });)
     // this.coursesService.getCourseById(this.findId).subscribe();///yrajja3 objet 7asb l id
      this.usersService.getUserById(this.findId).subscribe((data) =>{
        //console.log('here data',data.pp);
        this.newTab=data.pp});

        //this.title = response.response;
        
      
      //  this.matchSevice.getMatchById(this.matchId).subscribe((data)=>{console.log('here data',data.x);});




      
    }

  }

}
