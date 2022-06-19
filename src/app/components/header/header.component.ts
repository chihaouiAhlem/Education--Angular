import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isdisplayed:boolean=false;
  headerUser:boolean=false;
  users:any;
  headerTutor:boolean=false;
  headerAdmin:boolean=false;


  constructor(private router:Router,private userService:UsersService) { }

  ngOnInit() {
    
    this.users=JSON.parse(localStorage.getItem("ConnectedUser") || "[]");
   console.log("here my connected user",this.users.role);
    if (this.users.length=='0') {
        this.isdisplayed=true;
       
    }
else if (this.users.role=='student') {
  this.headerUser=true;
}
else if (this.users.role=='tutor') {
  this.headerTutor=true;
}
else if (this.users.role=='admin') {
  this.headerAdmin=true;
}


  }
  logout() {
    localStorage.removeItem('ConnectedUser');
   
      this.router.navigate(['events']);
    
  }
  goToProfile(param:number){
    ////redirection avec enregistrement du id dans l url
   // this.router.navigate([`userInfo/${param}`]);
   this.router.navigate([`userInfo/${param}`]); //najmou nhezou tableau//matchInfo howa path //


  }
  goToEdit(param) {
    // location.replace non ta3ml reload
    this.router.navigate([`editProfile/${param}`]); //najmou nhezou tableau//matchInfo howa path //
  }
  goToEditPass(param){
    this.router.navigate([`editPassword/${param}`]); //najmou nhezou tableau//matchInfo howa path //

  }
}
