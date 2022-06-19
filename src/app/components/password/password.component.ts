import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  editPassForm:FormGroup;
  user:any={};
  userSend:any={};
  connectedUserId:any;
  messageCurrent:string;
  messageNew:string;
  msg:string;
  constructor(private usersService:UsersService,private router:Router) { }

  ngOnInit() {
    this.connectedUserId = JSON.parse(localStorage.getItem("ConnectedUser") ); // variable sabbit fiha tous le contenu de orders

  }
  editPass(){
     if (this.user.password == this.connectedUserId.password) {
      if (this.user.newPass==this.user.rePass ) {
        this.userSend.newPass=this.user.newPass;
        console.log('send',this.userSend);
       this.usersService.updatePass(this.userSend,this.connectedUserId._id).subscribe((data)=>{
           this.msg=data.pp;
           console.log("msg",data.pp);
           this.router.navigate([``]);
     
     });
       }
    else {this.messageNew="please type the same password";}
   // console.log('here pass',this.connectedUserId.password);

     }
else {this.messageCurrent="please check your password";}

  }
}
