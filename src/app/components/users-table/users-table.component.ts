import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
//import { allUsers } from 'src/app/data/CoursData';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users:any=[];
title:string;
findId:any;
isDisplayed:boolean=false;
url:string;
///pagination
pageOfItems: Array<any>;
EditForm:FormGroup;
obj:any={};

  constructor(private router:Router,private usersService:UsersService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    //////edit user
    this.findId=this.activatedRoute.snapshot.paramMap.get('id');
    if(this.findId){
      // (this.courses=this.findTab;
       //this.course=this.courses[0];)
      // this.coursesService.getCourseById (this.findId).subscribe();
      this.usersService.getUserById(this.findId).subscribe((data)=>{
       this.obj=data.pp;
     });}
////////////edit




    this.usersService.getAllUsers().subscribe((response) =>{
      this.users = response.users;
     // this.title = response.response;
      
     });
     this.url = this.router.url;
     this.isDisplayed = (this.url !="/admin" ) ? true : false;


  }
  goToDisplay(param:number){
    ////redirection avec enregistrement du id dans l url
   // this.router.navigate([`userInfo/${param}`]);
   this.router.navigate([`userInfo/${param}`]); //najmou nhezou tableau//matchInfo howa path //


  }
  goToEdit(param) {
    // location.replace non ta3ml reload
    this.router.navigate([`editUser/${param}`]); //najmou nhezou tableau//matchInfo howa path //
  }
  deleteUserById(x) {
    ////loulanya une methode tab3a html
    this.usersService.deleteUserById(x).subscribe((data)=>{
      console.log('here after delete',data.pp);///reponse pp tjih fi data
      ////refresh sans reload
      ////sna3na fct kma on init bech ya3ml refresh automatique
      this.allUsers();
    }
    ); ///meth teb3a service
  }
  allUsers(){
    this.usersService.getAllUsers().subscribe((response) => {
      this.users = response.users;
      //this.title=response.response;///matches loula tableau vide declaree matches2 :ili ja ml BE

    });
  }
//////fnn fnction if event edit :visible : else hidden


  ////Pagination
onChangePage(pageOfItems: Array<any>) {
  // update current page of items
  this.pageOfItems = pageOfItems;
  }
////ngStyle pour les roles
roleStyle(role) {
  if (role=='admin') {
    return "red";
  } else if (role=='tutor') {
    return "green";
  } else {
    return "orange";
  }
}
  /////edit user
  edit(){
    this.findId=this.activatedRoute.snapshot.paramMap.get('id');

    if (this.findId) {
      ////call service to send math.find
      this.usersService.updateUser(this.obj).subscribe((data)=>{
       // this.course=data.pp;
        this.router.navigate([`admin`]);
  
      });
    }
  }
}
